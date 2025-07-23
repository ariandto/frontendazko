import { useState, useEffect } from "react";
import {
  Search,
  Package,
  Phone,
  RotateCcw,
  XCircle,
} from "lucide-react";
import azko from "../assets/azko.png";
import Navigation from "../layouts/Navigation";
import { Helmet } from "react-helmet";
import { API_VISIT } from "../config/apiurl";
import Footer from "../layouts/Footer"

// WhatsApp Icon SVG
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M16.003 2.933c-7.23 0-13.07 5.84-13.07 13.07 0 2.315.603 4.573 1.745 6.553L2.33 29.07l6.719-2.188a13.03 13.03 0 006.954 1.995h.002c7.229 0 13.069-5.839 13.069-13.069s-5.84-13.07-13.07-13.07zm0 23.868a11.81 11.81 0 01-6.022-1.722l-.432-.258-3.994 1.301 1.305-3.89-.281-.447A11.804 11.804 0 014.2 16.003c0-6.51 5.293-11.803 11.803-11.803s11.803 5.293 11.803 11.803-5.293 11.803-11.803 11.803zm6.451-8.909c-.353-.177-2.084-1.028-2.407-1.144-.324-.12-.56-.177-.795.177-.232.353-.914 1.144-1.121 1.379-.207.232-.414.262-.767.088-.353-.177-1.49-.549-2.837-1.747-1.049-.936-1.758-2.09-1.963-2.44-.206-.354-.022-.544.155-.719.158-.157.353-.409.529-.612.177-.207.235-.353.353-.59.117-.236.06-.443-.03-.62-.088-.177-.797-1.923-1.092-2.64-.286-.688-.578-.594-.795-.605-.206-.009-.442-.011-.68-.011-.235 0-.619.088-.944.441-.323.353-1.234 1.206-1.234 2.941 0 1.735 1.266 3.414 1.442 3.652.177.236 2.496 3.817 6.048 5.206.845.288 1.504.461 2.019.589.847.215 1.618.184 2.23.112.681-.08 2.084-.853 2.378-1.677.294-.824.294-1.529.206-1.677-.088-.147-.324-.236-.677-.413z"
      fill="#25D366"
    />
  </svg>
);

// -- Tipe DataItem
interface DataItem {
  noOrder: string;
  kodeStore: string;
  storeName: string;
  name: string;
  noLC: string;
  delivery: string;
  viaHub: string;
  nameContact1: string;
  contact1: string;
  nameContact2: string;
  contact2: string;
  namePicHub1: string;
  picHub1: string;
  namePicHub2: string;
  picHub2: string;
  status: string;
}


// --- Helper WhatsApp ---
function waLink(phone: string) {
  if (!phone) return "#";
  let no = phone;
  if (no.startsWith("0")) no = "62" + no.slice(1);
  return `https://wa.me/${no.replace(/[^0-9]/g, "")}`;
}

// --- ContactCard ---
const ContactCard = ({
  label,
  name,
  phone,
}: {
  label: string;
  name: string;
  phone: string;
}) => {
  if (!name && !phone) return null;
  return (
    <div className="flex items-center bg-white/70 border border-gray-100 rounded-xl px-3 py-2 mb-2 gap-2">
      <span className="text-xs text-gray-400 font-medium min-w-[72px]">{label}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate text-gray-700">{name}</div>
        {phone && (
          <a
            href={waLink(phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-600 hover:underline text-sm"
          >
            <WhatsAppIcon className="w-4 h-4 mr-1" />
            <span className="sr-only">{phone}</span>
          </a>
        )}
      </div>
    </div>
  );
};

function parseDeliveryDate(noLC: string): string {
  if (!noLC || noLC.length < 6) return "Tanggal tidak valid";

  const tahun = "20" + noLC.slice(0, 2); // 25
  const bulan = noLC.slice(2, 4); // 07
  const tanggal = noLC.slice(4, 6); // 13

  const bulanNama: Record<string, string> = {
    "01": "Jan", "02": "Feb", "03": "Mar",
    "04": "Apr", "05": "Mei", "06": "Jun",
    "07": "Jul", "08": "Agust", "09": "Sept",
    "10": "Okt", "11": "Nov", "12": "Des",
  };

  return `${tanggal} ${bulanNama[bulan] || "Bulan Tidak Valid"} ${tahun}`;
}


// --- ResultCard ---
const ResultCard = ({ item, delay }: { item: DataItem; delay: number }) => (
  <div
    className="bg-white/90 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/70"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex flex-col md:flex-row gap-6">
      {/* Detail */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold text-gray-800">Detail Pengiriman</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
          <div className="text-gray-500">No Order:</div>
      <div
  className="font-medium text-xs sm:text-sm text-red-600 break-words"
  title={item.noOrder}
>
  {item.noOrder}
</div>

          <div className="text-gray-500">Kode Store:</div>
          <div className="font-semibold">{item.kodeStore}</div>
          <div className="text-gray-500">Store Booking:</div>
          <div className="font-semibold">{item.storeName}</div>
          <div className="text-gray-500">Nama:</div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-gray-500">No LC:</div>
          <div className="font-semibold">{item.noLC}</div>
          <div className="text-gray-500">Delivery Date:</div>
          <div className="font-semibold text-red-500">{parseDeliveryDate(item.noLC)}</div>
          <div className="text-gray-500">Delivery:</div>
          <div className="font-semibold text-green-600">{item.delivery}</div>
          <div className="text-gray-500">Via Hub:</div>
          <div className="font-semibold">{item.viaHub}</div>

          <div className="text-gray-500">Status:</div>
<div className={`font-semibold ${item.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
  {item.status}
</div>
        </div>
      </div>
      {/* Kontak */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-bold text-gray-800">Kontak & PIC</h3>
        </div>
        <ContactCard label="Driver DC" name={item.nameContact1} phone={item.contact1} />
        <ContactCard label="Ast. Driver DC" name={item.nameContact2} phone={item.contact2} />
        <ContactCard label="PIC Hub 1" name={item.namePicHub1} phone={item.picHub1} />
        <ContactCard label="PIC Hub 2" name={item.namePicHub2} phone={item.picHub2} />
      </div>
    </div>
  </div>
);

// --- SearchBar ---
const SearchBar = ({
  query,
  setQuery,
  onSearch,
}: {
  query: string;
  setQuery: (v: string) => void;
  onSearch: () => void;
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Masukkan nomor order atau nomor receive..."
        className="w-full px-5 py-3 pl-12 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:outline-none transition bg-white/70 backdrop-blur"
      />
      <button
        onClick={onSearch}
        className="mt-4 w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-8 rounded-2xl hover:from-red-600 hover:to-rose-700 transition font-semibold text-base sm:text-lg shadow-md hover:shadow-lg"
      >
        Cari Pengiriman
      </button>
    </div>
  );
};

// --- LoadingScreen ---
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-base sm:text-lg font-semibold text-gray-700">Tunggu Sebentar....</p>
    </div>
  </div>
);

// --- Notification ---
const Notification = ({
  message,
  type,
}: {
  message: string;
  type: string;
}) => {
  let bgColor = "bg-gray-500";
  if (type === "success") bgColor = "bg-green-500";
  if (type === "error") bgColor = "bg-red-600";
  if (type === "warning") bgColor = "bg-yellow-400";

  return (
    <div className={`fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse`}>
      {message}
    </div>
  );
};

function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
  const postVisit = async () => {
    try {
      const res = await fetch(API_VISIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      console.log("📌 Visit logged from Home:", data);
    } catch (err) {
      console.error("❌ Gagal kirim kunjungan:", err);
    }
  };

  postVisit();
}, []);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      showNotification("Masukkan nomor order atau nomor receive.", "warning");
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbznes740p7n0dSKScA0T8CBhQEw4C2wMQ3T9BE3waICqXJsLf-JYihbT5eH6dmV67GR2A/exec?q=${encodeURIComponent(query)}`
      );
      const result = await res.json();
      setData(result);
      showNotification("Data berhasil ditemukan!", "success");
    } catch (err) {
      setData([]);
      showNotification("Terjadi kesalahan saat mencari data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2600);
  };

  const handleReset = () => {
    setQuery("");
    setData([]);
    setHasSearched(false);
  };

 

return (
  <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-50 to-rose-100">
    <Helmet>
      <title>Beranda - Lacak Pengiriman Azko</title>
      <meta
        name="description"
        content="Lacak status pengiriman barang Anda dengan mudah dan cepat menggunakan layanan Azko."
      />
      <meta property="og:title" content="Beranda - Lacak Pengiriman Azko" />
      <meta
        property="og:description"
        content="Cek status pengiriman barang Anda secara real-time dengan platform tracking Azko."
      />
      <meta property="og:type" content="website" />
    </Helmet>

    {loading && <LoadingScreen />}
    {notification && <Notification message={notification.message} type={notification.type} />}
    <Navigation />

    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 sm:w-72 sm:h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 sm:w-72 sm:h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-2000"></div>
    </div>

    <div className="relative z-10 pt-20 px-2 sm:px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Lacak Pengiriman
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <p className="text-base sm:text-xl text-gray-600">
              Cari dan lacak status pengiriman Anda dengan mudah dan cepat
            </p>
            <img src={azko} alt="Mobil Azko" className="w-12 sm:w-16 h-auto animate-bounce" />
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-4 sm:p-8 shadow-xl border border-white/20 mb-8">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        </div>

        <div className="space-y-5">
          {hasSearched && !loading && data.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Data tidak ditemukan
              </h3>
              <p className="text-gray-500 text-sm">
                Silakan periksa kembali nomor order atau nomor receive dan pastikan tidak ada spasi.
              </p>
            </div>
          ) : (
            data.map((item, index) => (
              <ResultCard key={index} item={item} delay={index * 0.08} />
            ))
          )}

          {data.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition font-semibold shadow-md hover:shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setData([])}
                className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl transition font-semibold shadow-md hover:shadow-lg"
              >
                <XCircle className="w-5 h-5" />
                <span>Tutup Hasil</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    <Footer />
  </div>
);
}
export default Home;
