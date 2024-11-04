const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require('./s3');

// Helper function to generate signed URL
const getS3SignedUrl = async (key) => {
  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
};

const uploadToS3 = async (file) => {
  const s3Key = `slide/${Date.now()}-${file.originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: s3Key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const putCommand = new PutObjectCommand(params);
  await s3Client.send(putCommand);

  // Return the key instead of signed URL
  return {
    key: s3Key,
    // You could return a public URL pattern if your bucket is public
    // url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`
  };
};

const uploadToLocal = async (file) => {
  const uploadsDir = path.join(__dirname, '..', 'uploads', 'slide');
  if (!fs.existsSync(uploadsDir)) {
    await fsPromises.mkdir(uploadsDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(uploadsDir, filename);
  await fsPromises.writeFile(filePath, file.buffer);
  return {
    url: `/uploads/slide/${filename}`,
    key: filePath
  };
};

const uploadImage = async (file) => {
  if (process.env.NODE_ENV === 'production') {
    return await uploadToS3(file);
  } else {
    return await uploadToLocal(file);
  }
};

// Helper function to generate signed URL
const getImageUrl = async (key) => {
  if (!key) return null;
  
  if (process.env.NODE_ENV === 'production') {
    const getCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
    return await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
  } else {
    // For local development
    if (key.startsWith('/')) {
      return key;
    }
    return `/uploads/slide/${path.basename(key)}`;
  }
};



const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  const deleteCommand = new DeleteObjectCommand(params);
  await s3Client.send(deleteCommand);
};

const deleteFromLocal = async (filePath) => {
  await fsPromises.unlink(filePath);
};

const deleteImage = async (key) => {
  if (process.env.NODE_ENV === 'production') {
    await deleteFromS3(key);
  } else {
    await deleteFromLocal(key);
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  getImageUrl
};