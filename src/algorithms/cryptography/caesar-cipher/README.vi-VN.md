# Thuật Toán Mã Hóa Caesar

_Đọc bằng các ngôn ngữ khác:_  
[_Русский_](README.ru-RU.md)

Trong lĩnh vực mật mã học, **mã hóa Caesar** (hay còn gọi là **mã Caesar**, **mã dịch chuyển**, **mã của Caesar** hoặc **dịch chuyển Caesar**) là một trong những kỹ thuật mã hóa đơn giản và phổ biến nhất. Đây là một dạng mã thay thế, trong đó mỗi chữ cái trong văn bản gốc được thay thế bằng một chữ cái cách nó một số vị trí cố định trong bảng chữ cái. Ví dụ, với dịch chuyển sang trái là `3`, `D` sẽ được thay bằng `A`, `E` sẽ thành `B`, và cứ như vậy. Phương pháp này được đặt theo tên của Julius Caesar, người đã sử dụng nó trong các thư từ cá nhân của mình.

![Thuật Toán Mã Hóa Caesar](https://upload.wikimedia.org/wikipedia/commons/4/4a/Caesar_cipher_left_shift_of_3.svg)

## Ví Dụ

Quá trình biến đổi có thể được biểu diễn bằng cách căn chỉnh hai bảng chữ cái; bảng chữ cái mã hóa là bảng chữ cái gốc được xoay sang trái hoặc phải một số vị trí. Ví dụ, đây là mã Caesar sử dụng xoay trái ba vị trí, tương đương với dịch chuyển phải 23 (tham số dịch chuyển được dùng như là khóa):

```text
Gốc:      ABCDEFGHIJKLMNOPQRSTUVWXYZ
Mã hóa:   XYZABCDEFGHIJKLMNOPQRSTUVW
```

Khi mã hóa, người dùng sẽ tra từng chữ cái trong thông điệp ở dòng "gốc" và ghi lại chữ cái tương ứng ở dòng "mã hóa".

```text
Văn bản gốc:  THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
Văn bản mã:   QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD
```

## Độ Phức Tạp

- Thời gian: O(|n|) — mỗi ký tự được xử lý một lần.

- Bộ nhớ: O(|n|) — tạo ra một chuỗi mới có độ dài bằng chuỗi đầu vào.

## Tài Liệu Tham Khảo

- [Mã hóa Caesar trên Wikipedia](https://vi.wikipedia.org/wiki/M%E1%BA%ADt_m%C3%A3_Caesar)
