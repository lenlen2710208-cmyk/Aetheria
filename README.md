# Aetheria

Aetheria — website fanmade tiếng Việt để tra cứu kho item và hỗ trợ Ngôi Sao Thời Trang VNG.

## Đang có
- Giao diện mobile-first Pastel Luxury.
- Trang chủ, Kho Item, Khu Thi Đấu.
- Tìm kiếm và lọc item.
- Virtualized grid để sẵn sàng cho kho 30k+ item.
- Pipeline dữ liệu: crawl → normalize → validate → publish.
- Chỉ đưa dữ liệu đã qua validation vào catalog.

## Chạy local
```bash
npm install
npm run dev
```

## Build production
```bash
npm run build
```

## Dữ liệu
Không dùng item giả để thay thế dữ liệu game thật. Khi nguồn dữ liệu được xác minh và pipeline chạy, catalog sẽ được cập nhật từ dữ liệu nguồn.

## GitHub Pages
Workflow deploy nằm tại `.github/workflows/deploy.yml` và chạy khi push lên `main`.

Aetheria là dự án fanmade, không phải sản phẩm chính thức của VNG.


## Archive UX
Cấu trúc kho đồ của Aetheria được thiết kế theo mô hình archive: Kho đồ, Trang phục/BST, Tủ của tôi, Chặng đấu và Bảng vàng; dữ liệu thật luôn được ưu tiên hơn dữ liệu minh họa.
