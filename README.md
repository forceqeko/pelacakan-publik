# 🔍 Pelacakan Sampel - Aplikasi Publik

Aplikasi web untuk melacak status sampel laboratorium BKHIT Sulawesi Utara secara real-time.

## 🚀 Fitur Utama

- ✅ **Pencarian Real-time** - Lacak status sampel dengan kode sampel
- ✅ **Timeline Visual** - Lihat progress pengujian dengan timeline interaktif
- ✅ **Design Modern** - UI/UX dengan glassmorphism dan animations
- ✅ **Responsive** - Optimal di desktop, tablet, dan mobile
- ✅ **Real-time Updates** - Data terbaru dari Google Sheets

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v3.4.4
- **Icons**: Lucide React
- **Data Fetching**: TanStack React Query
- **Build Tool**: Vite
- **Backend**: Google Apps Script
- **Database**: Google Sheets

## 📝 Setup & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## ⚠️ CSS Linting Warning

File `src/index.css` menampilkan warning "Unknown at rule @tailwind". Ini adalah warning normal dari CSS linter yang tidak mengenali direktif Tailwind CSS.

### Mengapa Warning Ini Muncul?
- `@tailwind base`, `@tailwind components`, `@tailwind utilities` adalah direktif khusus Tailwind CSS
- CSS linter standar tidak mengenali direktif ini
- Warning ini **TIDAK** mempengaruhi functionality aplikasi

### Solusi yang Sudah Diterapkan:
1. ✅ **VS Code Settings** - File `.vscode/settings.json` dengan konfigurasi CSS validation disabled
2. ✅ **CSS Custom Data** - File `.vscode/css_custom_data.json` untuk define Tailwind directives
3. ✅ **Build Test** - `npm run build` berhasil tanpa error
4. ✅ **Stylelint Config** - File `.stylelintrc.json` untuk ignore Tailwind rules

### Cara Mengatasi Warning di Editor Lain:
```css
/* Untuk editor yang tidak support Tailwind */
/* stylelint-disable-next-line at-rule-no-unknown */
@tailwind base;
/* stylelint-disable-next-line at-rule-no-unknown */
@tailwind components;
/* stylelint-disable-next-line at-rule-no-unknown */
@tailwind utilities;
```

## 🎨 Custom Animations

Aplikasi menggunakan custom CSS animations:
- `fadeInUp` - Entrance animation untuk cards
- `slideInFromLeft` - Side animation untuk timeline
- `float` - Floating animation untuk icons
- `glow` - Glow effect untuk buttons
- `gradientShift` - Animated gradient text

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🏗️ Project Structure

```
pelacakan-publik/
├── .vscode/              # VS Code settings
├── src/
│   ├── lib/             # API utilities
│   ├── index.css        # Tailwind + Custom CSS
│   ├── App.tsx          # Main app component
│   └── TrackerPage.tsx  # Tracking interface
├── public/              # Static assets
└── dist/               # Build output
```

## 🔧 Build Output

- ✅ CSS: ~20.90 kB (gzipped: 4.51 kB)
- ✅ JS: ~239.63 kB (gzipped: 73.91 kB)
- ✅ Build time: ~19.30s

---

**📞 Support**: Untuk pertanyaan teknis, hubungi tim development BKHIT Sulawesi Utara.