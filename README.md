# 📖 API Từ Điển Đa Ngôn Ngữ Miễn Phí

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdict.minhqnd.com)](https://dict.minhqnd.com)
[![License](https://img.shields.io/badge/license-CC%20BY--SA%204.0-blue)](LICENSE)

RESTful API từ điển tiếng Việt và đa ngôn ngữ miễn phí. Hệ thống cung cấp dữ liệu tra cứu chi tiết, phát âm IPA, từ đồng nghĩa và ví dụ minh họa cho hàng trăm ngàn từ vựng.

🔗 **Website & Documentation**: [dict.minhqnd.com](https://dict.minhqnd.com)

---

## 📊 Dữ liệu hệ thống

Hệ thống được vận hành trên nền tảng dữ liệu lớn và tối ưu:
- **Tổng số từ vựng**: 357,729+
- **Định nghĩa chi tiết**: 443,116+
- **Từ vựng có ví dụ**: 169,931+
- **Tổng số ngôn ngữ**: > 1,500 (Tiếng Việt, Anh, Trung, Nhật, Hàn, Pháp, Đức...)

### 💾 Tải xuống Database
Bạn có thể tải xuống toàn bộ dữ liệu từ điển dưới dạng file SQLite (`dictionary.db`) tại phần **[Releases](https://github.com/minhqnd/dictionary/releases)** của repository này để sử dụng offline hoặc tích hợp vào dự án cá nhân.

---

## ✨ Đặc điểm nổi bật

- 🔍 **Tìm kiếm thông minh**: Không phân biệt hoa thường, tự động chuẩn hoá diacritic tiếng Việt (ví dụ: `hoá` ↔ `hóa`, `kì` ↔ `kỳ`).
- 🔊 **Phát âm TTS**: Tích hợp Google TTS chuẩn cao.
- ⚡ **Siêu nhanh**: Kiến trúc Next.js 15 kết hợp SQLite và Vercel Edge Cache cho tốc độ phản hồi < 100ms.
- 🌐 **CORS Ready**: Hỗ trợ gọi API từ browser trực tiếp mà không bị chặn Cross-Origin.
- 📱 **SEO Toàn diện**: Metadata động và OpenGraph Image tự động tạo cho từng mục từ.

---

## 🚀 API Endpoints

### 1. Tra cứu từ vựng (Lookup)
`GET /api/v1/lookup?word={word}&lang={lang}&def_lang={def_lang}`

| Tham số | Bắt buộc | Mô tả |
| :--- | :---: | :--- |
| `word` | **Yes** | Từ cần tra cứu (ví dụ: `học sinh`) |
| `lang` | No | Mã ngôn ngữ nguồn (`vi`, `en`, `zh`...) |
| `def_lang`| No | Lọc ngôn ngữ định nghĩa (`vi` hoặc `en`) |

### 2. Gợi ý từ (Suggest)
`GET /api/v1/suggest?q={prefix}&limit={limit}`

| Tham số | Bắt buộc | Mô tả |
| :--- | :---: | :--- |
| `q` | **Yes** | Chuỗi prefix cần gợi ý (ví dụ: `học`) |
| `limit` | No | Giới hạn kết quả (1-20, mặc định: 5) |

### 3. Phát âm (TTS)
`GET /api/v1/tts?word={word}&lang={lang}`

| Tham số | Bắt buộc | Mô tả |
| :--- | :---: | :--- |
| `word` | **Yes** | Từ cần phát âm |
| `lang` | No | Mã ngôn ngữ (mặc định: `vi`) |

---

## 📦 JSON Response mẫu

```json
{
  "exists": true,
  "word": "học sinh",
  "results": [{
    "lang_code": "vi",
    "lang_name": "Tiếng Việt",
    "audio": "/api/v1/tts?word=h%E1%BB%8Dc%20sinh&lang=vi",
    "meanings": [
      {
        "definition": "người học ở bậc phổ thông",
        "definition_lang": "vi",
        "example": "học sinh tiểu học ~ thời học sinh",
        "pos": "Danh từ",
        "sub_pos": "Danh từ chỉ vật, hiện tượng",
        "source": "Tiếng Việt Thông Dụng",
        "links": []
      },
      {
        "definition": "Trẻ em học tập ở nhà trường.",
        "definition_lang": "vi",
        "example": "Học sinh trung học.",
        "pos": "Danh từ",
        "source": "Wiktionary",
        "links": []
      },
      {
        "definition": "a student",
        "definition_lang": "en",
        "pos": "Danh từ",
        "source": "Wiktionary EN",
        "links": []
      }
    ],
    "pronunciations": [
      { "ipa": "[hawk͡p̚˧˨ʔ sïŋ˧˧]", "region": "Hà-Nội" },
      { "ipa": "[hawk͡p̚˨˩ʔ sɨn˧˧]", "region": "Huế" },
      { "ipa": "[hawk͡p̚˨˩˨ sɨn˧˧]", "region": "Saigon" }
    ],
    "translations": [
      { "lang_code": "en", "translation": "student", "lang_name": "Tiếng Anh" },
      { "lang_code": "en", "translation": "pupil", "lang_name": "Tiếng Anh" },
      { "lang_code": "zh", "translation": "學生", "lang_name": "Tiếng Trung Quốc" }
    ],
    "relations": [
      { "related_word": "học viên", "relation_type": "Đồng nghĩa" },
      { "related_word": "sinh viên", "relation_type": "Đồng nghĩa" }
    ]
  }]
}
```

---

## 📚 Nguồn dữ liệu & Giấy phép

Dữ liệu được tổng hợp từ các dự án mã nguồn mở:
- **vntk/dictionary**: MIT License
- **Hồ Ngọc Đức (Free Vietnamese Dictionary Project)**: GNU GPL
- **Vietnamese Explanatory Dictionary**: GNU GPL
- **tudientv.com**: GNU GPL
- **Wiktionary & Wikipedia Tiếng Việt**: CC BY-SA 4.0

> [!NOTE]
> Một số câu ví dụ được bổ sung tự động bằng AI (LLM) để tăng tính ứng dụng cho các từ vựng chưa có ví dụ gốc.

---

---

## ⚖️ Giấy phép & Sử dụng

API từ điển được cung cấp bởi **@minhqnd** theo giấy phép **[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.vi)**.

**Bạn được tự do:**
- ✅ **Chia sẻ**: Sao chép và phân phối lại dữ liệu từ điển, kể cả thương mại.
- ✅ **Chuyển thể**: Chỉnh sửa, bổ sung và xây dựng dựa trên dữ liệu từ điển.

**Với điều kiện:**
- 📌 **Ghi công**: Ghi nguồn `@minhqnd`, liên kết đến [dict.minhqnd.com](https://dict.minhqnd.com) và ghi chú nếu có thay đổi.
- 📌 **Chia sẻ tương tự**: Phân phối bản chỉnh sửa theo cùng giấy phép CC BY-SA 4.0.
- 📌 **Dẫn link nguồn**: Vui lòng dẫn link đến website để người dùng có thể tra cứu nguồn và giấy phép chi tiết của từng bộ dữ liệu gốc.

---

## 🛠️ Chạy Local

```bash
git clone https://github.com/minhqnd/dictionary.git
pnpm install
pnpm dev
```

---

## 👤 Author
**minhqnd** - [minhqnd.com](https://minhqnd.com)
