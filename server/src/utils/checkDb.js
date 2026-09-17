import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const mask = (value) =>
  value.replace(/\/\/([^:]+):([^@]+)@/, (_, user) => `//${user}:*****@`);

const run = async () => {
  if (!uri) {
    console.error('Thieu MONGODB_URI trong file .env');
    process.exit(1);
  }

  console.log(`Dang ket noi: ${mask(uri)}`);

  if (uri.includes('<') || uri.includes('>')) {
    console.error('URI van con placeholder <username>/<password>/<cluster>. Hay thay bang gia tri that.');
    process.exit(1);
  }

  const isSrv = uri.startsWith('mongodb+srv://');
  const dbName = uri.split('?')[0].split('.net/')[1] || uri.split('?')[0].split(':27017/')[1] || '';

  if (isSrv && !dbName) {
    console.warn('Canh bao: URI chua co ten database, Mongoose se dung database "test".');
    console.warn('Them /homestay_booking vao truoc dau ? trong connection string.');
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    const { host, name } = mongoose.connection;
    const collections = await mongoose.connection.db.listCollections().toArray();

    console.log(`OK - da ket noi toi ${host}`);
    console.log(`Database: ${name}`);
    console.log(
      collections.length
        ? `Collections: ${collections.map((c) => c.name).join(', ')}`
        : 'Database dang rong, chay "npm run seed" de tao du lieu mau.'
    );
  } catch (error) {
    console.error('\nKet noi that bai:', error.message);

    if (/authentication failed/i.test(error.message)) {
      console.error('-> Sai username hoac password. Neu password co ky tu dac biet, phai URL-encode.');
    } else if (/querySrv|ENOTFOUND|getaddrinfo/i.test(error.message)) {
      console.error('-> Sai hostname cluster, hoac mang dang chan DNS SRV.');
    } else if (/timed out|ETIMEDOUT/i.test(error.message)) {
      console.error('-> IP cua ban chua duoc them vao Network Access tren Atlas.');
    }
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
