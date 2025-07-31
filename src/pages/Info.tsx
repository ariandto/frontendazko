import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navigation from "../layouts/TopNavigation";
import { API_VISIT } from "../config/apiurl";

import { Info } from "lucide-react";

// Fungsi untuk mencatat kunjungan halaman
const postVisit = async () => {
  try {
    const res = await fetch(API_VISIT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    console.log("📌 Visit logged from Info:", data);
  } catch (err) {
    console.error("❌ Gagal kirim kunjungan:", err);
  }
};

const InfoPage = () => {
  useEffect(() => {
    postVisit();
  }, []);

  return (
    <>
      <Helmet>
        <title>Informasi Penting - Azko</title>
        <meta
          name="description"
          content="Informasi penting mengenai TUGU dan PERCEPATAN di Azko. Pastikan semua prosedur diikuti dengan benar."
        />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center p-4 sm:p-6 pt-20">
        <div className="max-w-3xl w-full bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-rose-600">
            Informasi Penting: TUGU & PERCEPATAN
          </h1>

          <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">
            {/* Bagian TUGU */}
            <div>
              <h2 className="font-semibold text-rose-500">TUGU</h2>
              <ul className="list-disc list-inside ml-4">
                <li>Pastikan <strong>berita acara</strong> dikirim melalui email.</li>
                <li>
                    Input Google Formulir
                  dengan benar.
                </li>
                <li>
                  Barang yang <strong>rusak</strong> harus dipacking kembali dengan rapi.
                </li>
              </ul>
            </div>

            {/* Bagian PERCEPATAN */}
            <div>
              <h2 className="font-semibold text-rose-500">PERCEPATAN</h2>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Wajib mendapatkan <strong>approve</strong> dari <strong>Pak Yusuf</strong>, selaku Manager DC.
                </li>
                <li>
                  Setelah approve, segera input Google Formulir percepatan.
                </li>
                <li>
                  Jangan lupa untuk <strong>release</strong> setelah input dilakukan.
                </li>
              </ul>
            </div>

            {/* Tautan ke halaman visitor */}
            <div className="flex justify-start items-center gap-1 text-blue-500 hover:text-red-700 transition">

              <Info size={16} />
              <Link
                to="/visitor"
                className="hover:underline hover:text-rose-600 transition"
              >
                Lihat Riwayat Pengunjung
              </Link>
            </div>
          </div>

          {/* Tombol kembali */}
          <div className="pt-4 text-center">
            <Link
              to="/"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2 rounded-lg transition-all"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
