# HomestayViet — Website đặt phòng homestay

Monorepo gồm 2 phần:

| Thư mục  | Công nghệ                                      | Port |
| -------- | ---------------------------------------------- | ---- |
| `client` | Next.js 15 (App Router), React 19, Context API, Tailwind CSS | 3000 |
| `server` | Node.js, Express 4, MongoDB (Mongoose), JWT    | 5000 |

## Yêu cầu

- Node.js 18+ (máy bạn đang dùng v24)
- MongoDB Atlas (free tier M0) hoặc MongoDB chạy local

## Setup MongoDB Atlas

1. Đăng ký tại [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. **Create Deployment** → chọn **M0 Free** → chọn region gần (Singapore) → Create
3. **Database Access** → Add New Database User → chọn Password, đặt username/password, quyền **Read and write to any database**
4. **Network Access** → Add IP Address → `Add Current IP Address` (hoặc `0.0.0.0/0` nếu IP nhà bạn hay đổi — chỉ dùng khi dev)
5. **Database** → nút **Connect** → **Drivers** → chọn Node.js → copy connection string
6. Dán vào `server/.env`, thay `<db_password>` bằng mật khẩu thật và thêm tên database `homestay_booking` vào trước dấu `?`:

```
MONGODB_URI=mongodb+srv://admin:matkhau@cluster0.ab1cd.mongodb.net/homestay_booking?retryWrites=true&w=majority
```

> Nếu mật khẩu có ký tự đặc biệt (`@ : / ? # [ ] %`) thì phải URL-encode, ví dụ `@` → `%40`.

Kiểm tra kết nối trước khi chạy server:

```bash
cd server && npm run check-db
```

## Chạy backend

```bash
cd server
npm install
cp .env.example .env   # sửa MONGODB_URI và JWT_SECRET
npm run check-db       # xác nhận kết nối Atlas OK
npm run seed           # tạo dữ liệu mẫu (4 homestay + 2 tài khoản)
npm run dev
```

API chạy tại `http://localhost:5000/api`.

Tài khoản demo sau khi seed (mật khẩu `123456`):

- `host@homestay.vn` — vai trò `host`, đăng được homestay
- `user@homestay.vn` — vai trò `user`, đặt phòng

## Chạy frontend

```bash
cd client
npm install
cp .env.local.example .env.local
npm run dev
```

Web chạy tại `http://localhost:3000`.

## API

| Method | Endpoint                     | Auth        | Mô tả                    |
| ------ | ---------------------------- | ----------- | ------------------------ |
| POST   | `/api/auth/register`         | —           | Đăng ký                  |
| POST   | `/api/auth/login`            | —           | Đăng nhập                |
| GET    | `/api/auth/me`               | Bearer      | Thông tin tài khoản      |
| GET    | `/api/homestays`             | —           | Danh sách + lọc/phân trang |
| GET    | `/api/homestays/:slug`       | —           | Chi tiết homestay        |
| POST   | `/api/homestays`             | host/admin  | Tạo homestay             |
| PUT    | `/api/homestays/:id`         | host/admin  | Cập nhật homestay        |
| DELETE | `/api/homestays/:id`         | host/admin  | Xóa homestay             |
| POST   | `/api/bookings`              | Bearer      | Đặt phòng (chặn trùng lịch) |
| GET    | `/api/bookings/me`           | Bearer      | Đơn của tôi              |
| GET    | `/api/bookings/:id`          | Bearer      | Chi tiết đơn             |
| PATCH  | `/api/bookings/:id/cancel`   | Bearer      | Hủy đơn                  |

Query lọc homestay: `city`, `minPrice`, `maxPrice`, `guests`, `keyword`, `page`, `limit`.

## Cấu trúc

```
server/src
├── config/db.js            kết nối MongoDB
├── models/                 User, Homestay, Booking
├── controllers/            xử lý nghiệp vụ
├── routes/                 định nghĩa endpoint + validator
├── middlewares/            auth (JWT), validate, errorHandler
├── utils/                  ApiError, asyncHandler, seed
├── app.js                  cấu hình Express
└── server.js               entrypoint

client/src
├── app/                    App Router: /, /homestays, /homestays/[slug], /login, /register, /bookings
├── components/             Header, Footer, SearchBar, HomestayCard, BookingForm
├── context/                AuthContext, SearchContext, BookingContext, AppProviders
└── lib/api.js              fetch wrapper + format tiền/ngày
```

## Quản lý state bằng Context API

- **AuthContext** — user, token (localStorage), `login`/`register`/`logout`, tự khôi phục phiên qua `/auth/me`
- **SearchContext** — bộ lọc tìm kiếm, sinh sẵn `queryString` cho trang danh sách
- **BookingContext** — danh sách đơn, `createBooking`, `cancelBooking`

Cả ba được gộp trong `AppProviders` và bọc ở `app/layout.js`.

## Hướng phát triển tiếp

- Upload ảnh (Cloudinary / S3) thay vì URL thủ công
- Đánh giá & bình luận cho homestay
- Trang quản trị cho host: quản lý homestay và duyệt đơn
- Thanh toán online (VNPay / MoMo)
- Lịch chặn ngày đã đặt trên UI (hiện mới kiểm tra ở backend)
