import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { Helmet } from "react-helmet";

const Info = () => {
  return (
    <>
     <Helmet>
        <title>Informasi Penting - Azko</title>
        <meta name="description" content="Informasi penting mengenai TUGU dan PERCEPATAN di Azko. Pastikan semua prosedur diikuti dengan benar." />
      </Helmet>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center p-4 sm:p-6 pt-20">
        <div className="max-w-3xl w-full bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-rose-600">
            Informasi Penting: TUGU & PERCEPATAN
          </h1>
          <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="font-semibold text-rose-500">TUGU</h2>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Pastikan <strong>berita acara</strong> dikirim melalui email.
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdeRLJKiPsOgKaumUHDXBI6lLlGzQZqN8Zpw-DMFr59xeVQKA/viewform?pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
                  >
                    Input Google Formulir
                  </a>
                  &nbsp;dengan benar.
                </li>

                <li>
                  Barang yang <strong>rusak</strong> harus dipacking kembali
                  dengan rapi.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-rose-500">PERCEPATAN</h2>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Wajib mendapatkan <strong>approve</strong> dari{" "}
                  <strong>Pak Yusuf</strong>, selaku Manager DC.
                </li>
                <li>
                  Setelah approve, segera
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdeRLJKiPsOgKaumUHDXBI6lLlGzQZqN8Zpw-DMFr59xeVQKA/viewform?pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
                  >
                    &nbsp;input Google Formulir
                  </a>
                  &nbsp;percepatan.
                </li>

                <li>
                  Jangan lupa untuk <strong>release</strong> setelah input
                  dilakukan.
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
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

export default Info;
