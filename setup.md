# دليل إعداد موقع SportsPulse الرياضي

## المتطلبات الأساسية
- PHP 7.4 أو أحدث
- MySQL 5.7 أو أحدث
- خادم ويب (Apache/Nginx)
- تفعيل cURL في PHP

## خطوات الإعداد

### 1. إعداد قاعدة البيانات
```sql
CREATE DATABASE sportspulse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. استيراد جداول قاعدة البيانات
- قم بتشغيل ملف `database/schema.sql`
- أو أنشئ الجداول يدوياً باستخدام الأوامر الموجودة في الملف

### 3. ضبط إعدادات الاتصال
عدل ملف `config/database.php` وأضف بيانات الاتصال الخاصة بك:
```php
$host = 'localhost';
$dbname = 'sportspulse';
$username = 'your_username';
$password = 'your_password';
```

### 4. إعداد بوت تليجرام
- أنشئ بوت جديد عبر @BotFather في تليجرام
- احصل على التوكن (Token)
- عدل ملف `config/telegram.php` وأضف التوكن
- قم بضبط Webhook للبوت

### 5. ضبط الصلاحيات
تأكد من أن المجلدات التالية قابلة للكتابة:
- `uploads/`
- `cache/`

### 6. اختبار الموقع
- افتح الصفحة الرئيسية: `http://yourdomain.com`
- جرب نظام إدارة الأخبار: `http://yourdomain.com/admin`
- اختبر إرسال أخبار عبر البوت

## هيكل المجلدات
```
sportspulse/
├── index.html              # الصفحة الرئيسية
├── matches.html            # صفحة المباريات
├── news.html              # صفحة الأخبار
├── about.html             # صفحة من نحن
├── contact.html           # صفحة اتصل بنا
├── admin/                 # لوحة التحكم
│   ├── login.php          # تسجيل الدخول
│   ├── dashboard.php      # لوحة التحكم
│   ├── add-news.php       # إضافة خبر
│   ├── edit-news.php      # تعديل خبر
│   └── logout.php         # تسجيل الخروج
├── api/                   # واجهات API
│   ├── telegram-webhook.php
│   └── news-api.php
├── config/                # ملفات الإعداد
├── database/              # ملفات قاعدة البيانات
├── uploads/               # مجلد الرفع
├── css/                   # ملفات CSS
├── js/                    # ملفات JavaScript
└── images/                # الصور
```

## ملاحظات مهمة
- تأكد من تشفير كلمات المرور في قاعدة البيانات
- استخدم شهادة SSL لأمان الاتصال
- قم بعمل نسخ احتياطية دورية لقاعدة البيانات
- راقب سجلات الأخطاء لحل المشكلات