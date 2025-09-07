import { google } from "googleapis";

export interface DriveFile {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink?: string;
  mimeType: string;
  size: string;
}

export interface DriveFolder {
  id: string;
  name: string;
  webViewLink: string;
}

export interface UploadFileOptions {
  fileName: string;
  mimeType: string;
  folderId?: string;
  description?: string;
}

export interface CreateFolderOptions {
  name: string;
  parentId?: string;
  description?: string;
}

class GoogleDriveService {
  private drive: any;
  private auth: any;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET,
      "urn:ietf:wg:oauth:2.0:oob"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_REFRESH_TOKEN,
    });

    this.auth = oauth2Client;
    this.drive = google.drive({ version: "v3", auth: oauth2Client });
  }

  /**
   * Upload a file to Google Drive
   */
  async uploadFile(
    fileBuffer: Buffer,
    options: UploadFileOptions
  ): Promise<DriveFile> {
    try {
      const { fileName, mimeType, folderId, description } = options;

      const fileMetadata: any = {
        name: fileName,
        description: description || `Uploaded file: ${fileName}`,
      };

      // Set parent folder if provided
      if (folderId) {
        fileMetadata.parents = [folderId];
      }

      const media = {
        mimeType,
        body: require("stream").Readable.from(fileBuffer),
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields:
          "id,name,webViewLink,webContentLink,thumbnailLink,mimeType,size",
      });

      // Make file publicly viewable
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      return {
        id: response.data.id,
        name: response.data.name,
        webViewLink: response.data.webViewLink,
        webContentLink: response.data.webContentLink,
        thumbnailLink: response.data.thumbnailLink,
        mimeType: response.data.mimeType,
        size: response.data.size,
      };
    } catch (error) {
      console.error("Error uploading file to Google Drive:", error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Create a folder in Google Drive
   */
  async createFolder(options: CreateFolderOptions): Promise<DriveFolder> {
    try {
      const { name, parentId, description } = options;

      const fileMetadata: any = {
        name,
        mimeType: "application/vnd.google-apps.folder",
        description: description || `Folder: ${name}`,
      };

      // Set parent folder if provided
      if (parentId) {
        fileMetadata.parents = [parentId];
      }

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: "id,name,webViewLink",
      });

      return {
        id: response.data.id,
        name: response.data.name,
        webViewLink: response.data.webViewLink,
      };
    } catch (error) {
      console.error("Error creating folder in Google Drive:", error);
      throw new Error(`Failed to create folder: ${error.message}`);
    }
  }

  /**
   * Get or create event-specific folders
   */
  async getOrCreateEventFolders(eventTitle: string): Promise<{
    imageFolder: DriveFolder;
    videoFolder: DriveFolder;
  }> {
    try {
      const rootFolderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

      // Sanitize event title for folder name
      const sanitizedTitle = eventTitle.replace(/[^a-zA-Z0-9\s-]/g, "").trim();

      // Create or get Events folder
      let eventsFolder = await this.findFolderByName("Events", rootFolderId);
      if (!eventsFolder) {
        eventsFolder = await this.createFolder({
          name: "Events",
          parentId: rootFolderId,
          description: "Root folder for all event-related content",
        });
      }

      // Create event-specific image folder
      const imageFolderName = `${sanitizedTitle}-Images`;
      let imageFolder = await this.findFolderByName(
        imageFolderName,
        eventsFolder.id
      );
      if (!imageFolder) {
        imageFolder = await this.createFolder({
          name: imageFolderName,
          parentId: eventsFolder.id,
          description: `Images for event: ${eventTitle}`,
        });
      }

      // Create event-specific video folder
      const videoFolderName = `${sanitizedTitle}-Videos`;
      let videoFolder = await this.findFolderByName(
        videoFolderName,
        eventsFolder.id
      );
      if (!videoFolder) {
        videoFolder = await this.createFolder({
          name: videoFolderName,
          parentId: eventsFolder.id,
          description: `Videos for event: ${eventTitle}`,
        });
      }

      return {
        imageFolder,
        videoFolder,
      };
    } catch (error) {
      console.error("Error creating event folders:", error);
      throw new Error(`Failed to create event folders: ${error.message}`);
    }
  }

  /**
   * Find a folder by name within a parent folder
   */
  private async findFolderByName(
    folderName: string,
    parentId?: string
  ): Promise<DriveFolder | null> {
    try {
      let query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

      if (parentId) {
        query += ` and '${parentId}' in parents`;
      }

      const response = await this.drive.files.list({
        q: query,
        fields: "files(id,name,webViewLink)",
      });

      if (response.data.files && response.data.files.length > 0) {
        const folder = response.data.files[0];
        return {
          id: folder.id,
          name: folder.name,
          webViewLink: folder.webViewLink,
        };
      }

      return null;
    } catch (error) {
      console.error("Error finding folder:", error);
      return null;
    }
  }

  /**
   * Get or create general content folders
   */
  async getOrCreateGeneralFolders(): Promise<{
    imageFolder: DriveFolder;
    videoFolder: DriveFolder;
  }> {
    try {
      const rootFolderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

      // Create or get General Content folder
      let generalFolder = await this.findFolderByName(
        "General-Content",
        rootFolderId
      );
      if (!generalFolder) {
        generalFolder = await this.createFolder({
          name: "General-Content",
          parentId: rootFolderId,
          description: "General content not tied to specific events",
        });
      }

      // Create general images folder
      let imageFolder = await this.findFolderByName("Images", generalFolder.id);
      if (!imageFolder) {
        imageFolder = await this.createFolder({
          name: "Images",
          parentId: generalFolder.id,
          description: "General images",
        });
      }

      // Create general videos folder
      let videoFolder = await this.findFolderByName("Videos", generalFolder.id);
      if (!videoFolder) {
        videoFolder = await this.createFolder({
          name: "Videos",
          parentId: generalFolder.id,
          description: "General videos",
        });
      }

      return {
        imageFolder,
        videoFolder,
      };
    } catch (error) {
      console.error("Error creating general folders:", error);
      throw new Error(`Failed to create general folders: ${error.message}`);
    }
  }
  /**
   * Delete a file from Google Drive
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
    } catch (error) {
      console.error("Error deleting file from Google Drive:", error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Generate a shareable link for a file
   */
  async generateShareableLink(fileId: string): Promise<string> {
    try {
      // Ensure the file has public read permissions
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      // Return direct download link for better performance
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } catch (error) {
      console.error("Error generating shareable link:", error);
      throw new Error(`Failed to generate shareable link: ${error.message}`);
    }
  }

  /**
   * Generate thumbnail for images
   */
  async generateThumbnail(fileId: string, size: number = 400): Promise<string> {
    try {
      // For images, Google Drive automatically generates thumbnails
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: "thumbnailLink,mimeType",
      });

      if (response.data.mimeType?.startsWith("image/")) {
        // Google Drive provides thumbnail links for images
        if (response.data.thumbnailLink) {
          // Replace the default size with our desired size
          return response.data.thumbnailLink.replace(/=s\d+/, `=s${size}`);
        }

        // Fallback: use the direct view link as thumbnail
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=s${size}`;
      }

      // For non-image files, return a generic thumbnail or the file icon
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=s${size}`;
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      // Return a fallback thumbnail URL
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=s${size}`;
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(fileId: string): Promise<DriveFile> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields:
          "id,name,webViewLink,webContentLink,thumbnailLink,mimeType,size,createdTime,modifiedTime",
      });

      return {
        id: response.data.id,
        name: response.data.name,
        webViewLink: response.data.webViewLink,
        webContentLink: response.data.webContentLink,
        thumbnailLink: response.data.thumbnailLink,
        mimeType: response.data.mimeType,
        size: response.data.size,
      };
    } catch (error) {
      console.error("Error getting file metadata:", error);
      throw new Error(`Failed to get file metadata: ${error.message}`);
    }
  }

  /**
   * List files in a folder
   */
  async listFilesInFolder(
    folderId: string,
    pageSize: number = 100,
    pageToken?: string
  ): Promise<{
    files: DriveFile[];
    nextPageToken?: string;
  }> {
    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        pageSize: pageSize,
        pageToken: pageToken,
        fields:
          "nextPageToken,files(id,name,webViewLink,webContentLink,thumbnailLink,mimeType,size)",
      });

      const files =
        response.data.files?.map((file: any) => ({
          id: file.id,
          name: file.name,
          webViewLink: file.webViewLink,
          webContentLink: file.webContentLink,
          thumbnailLink: file.thumbnailLink,
          mimeType: file.mimeType,
          size: file.size,
        })) || [];

      return {
        files,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error("Error listing files in folder:", error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Move file to a different folder
   */
  async moveFile(fileId: string, newParentId: string): Promise<void> {
    try {
      // Get current parents
      const file = await this.drive.files.get({
        fileId: fileId,
        fields: "parents",
      });

      const previousParents = file.data.parents?.join(",");

      // Move file to new parent
      await this.drive.files.update({
        fileId: fileId,
        addParents: newParentId,
        removeParents: previousParents,
      });
    } catch (error) {
      console.error("Error moving file:", error);
      throw new Error(`Failed to move file: ${error.message}`);
    }
  }

  /**
   * Get or create thumbnails folder
   */
  async getOrCreateThumbnailsFolder(): Promise<DriveFolder> {
    try {
      const rootFolderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

      let thumbnailsFolder = await this.findFolderByName(
        "Thumbnails",
        rootFolderId
      );
      if (!thumbnailsFolder) {
        thumbnailsFolder = await this.createFolder({
          name: "Thumbnails",
          parentId: rootFolderId,
          description: "Generated thumbnails for images and videos",
        });
      }

      return thumbnailsFolder;
    } catch (error) {
      console.error("Error creating thumbnails folder:", error);
      throw new Error(`Failed to create thumbnails folder: ${error.message}`);
    }
  }

  /**
   * Get or create a folder by name
   */
  async getOrCreateFolder(
    folderName: string,
    parentId?: string
  ): Promise<string> {
    try {
      // Try to find existing folder
      const existingFolder = await this.findFolderByName(folderName, parentId);

      if (existingFolder) {
        return existingFolder.id;
      }

      // Create new folder if not found
      const newFolder = await this.createFolder({
        name: folderName,
        parentId: parentId,
        description: `Auto-created folder: ${folderName}`,
      });

      return newFolder.id;
    } catch (error) {
      console.error("Error getting or creating folder:", error);
      throw new Error(`Failed to get or create folder: ${error.message}`);
    }
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService();
export default googleDriveService;
