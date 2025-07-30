import { useEffect, useState } from "react";
import Navigation from "../layouts/Navigation";
import {
  API_VISIT,
  API_VISITORS_COUNT,
  API_VISITORS_VIEW,
} from "../config/apiurl";
import { Helmet } from "react-helmet";
import {
  Users,
  Eye,
  Calendar,
  Clock,
  TrendingUp,
  Globe,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

interface Visitor {
  ID: number;
  IP: string;
  VisitedDate: string;
  CreatedAt: string;
}

export default function VisitorStats() {
  const [count, setCount] = useState<number | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState("");
  const [searchIP, setSearchIP] = useState("");
  const [avgVisitorsPerDay, setAvgVisitorsPerDay] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kirim data kunjungan (POST)
        await fetch(API_VISIT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Gagal POST /api/visit: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log("✅ Visit recorded:", data);
          })
          .catch((err) => {
            console.error("❌ Visit POST failed:", err);
          });

        // Ambil total count
        const countRes = await fetch(API_VISITORS_COUNT);
        const countData = await countRes.json();
        setCount(countData.total_unique_visitors_today);

        // Ambil detail kunjungan
        const viewRes = await fetch(API_VISITORS_VIEW);
        const viewData = await viewRes.json();
        setVisitors(viewData.visitors);
        setFilteredVisitors(viewData.visitors);
        
        // Hitung rata-rata pengunjung per hari
        const uniqueDates = new Set(viewData.visitors.map(v => new Date(v.VisitedDate).toDateString()));
        const avg = viewData.visitors.length / uniqueDates.size;
        setAvgVisitorsPerDay(Math.round(avg));
      } catch (error) {
        console.error("Gagal mengambil data pengunjung:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter function
  useEffect(() => {
    let filtered = visitors;

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter((visitor) => {
        const visitDate = new Date(visitor.VisitedDate);
        const filterDate = new Date(dateFilter);
        return visitDate.toDateString() === filterDate.toDateString();
      });
    }

    // Filter by IP
    if (searchIP) {
      filtered = filtered.filter((visitor) =>
        visitor.IP.toLowerCase().includes(searchIP.toLowerCase())
      );
    }

    setFilteredVisitors(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [dateFilter, searchIP, visitors]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVisitors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>Statistik Pengunjung - Azko</title>
        <meta
          name="description"
          content="Statistik jumlah pengunjung unik hari ini dan data historis pengunjung di Azko."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <div className="pt-16 sm:pt-20 min-h-screen bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl sm:rounded-2xl shadow-lg">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Statistik Pengunjung
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Summary Pengunjung Website Lacak Pengiriman Azko berdasarkan IP Address
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-100 border-t-red-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-r-rose-500 rounded-full animate-spin animation-delay-1000"></div>
                </div>
                <p className="text-gray-600 mt-4 text-sm sm:text-lg">
                  Memuat data pengunjung...
                </p>
              </div>
            ) : (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                  {/* Today's Visitors Card */}
                  <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl sm:rounded-2xl shadow-lg">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2">
                          Pengunjung Hari Ini
                        </h3>
                        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                          {count ?? 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 sm:px-4 py-2 rounded-full w-fit">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Pengunjung unik dalam 24 jam terakhir
                      </span>
                    </div>
                  </div>

                  {/* Total Records Card */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-4 mb-4 sm:mb-6">
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl sm:rounded-2xl shadow-lg">
                        <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2">
                          Total Rekaman
                        </h3>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                          {visitors.length}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-full w-fit">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Semua kunjungan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Average Visitors Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 mb-8 sm:mb-12">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6">
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl sm:rounded-2xl shadow-lg">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2">
                        Rata-rata per Hari
                      </h3>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        {avgVisitorsPerDay}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-700 bg-yellow-100 px-3 sm:px-4 py-2 rounded-full w-fit">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">
                      Rata-rata kunjungan harian
                    </span>
                  </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg sm:rounded-xl">
                      <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      Filter & Pencarian
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Date Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Filter Tanggal
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="date"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* IP Search */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cari IP Address
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Masukkan IP address..."
                          value={searchIP}
                          onChange={(e) => setSearchIP(e.target.value)}
                          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(dateFilter || searchIP) && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                      <button
                        onClick={() => {
                          setDateFilter("");
                          setSearchIP("");
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium w-fit"
                      >
                        Hapus Semua Filter
                      </button>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>
                          Menampilkan {filteredVisitors.length} dari{" "}
                          {visitors.length} data
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visitor Table */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg sm:rounded-xl">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Riwayat Kunjungan
                      </h2>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    {currentItems.length === 0 ? (
                      <div className="text-center py-12 sm:py-16 px-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-base sm:text-lg mb-2">
                          {dateFilter || searchIP
                            ? "Tidak ada data yang sesuai dengan filter"
                            : "Belum ada data pengunjung"}
                        </p>
                        {(dateFilter || searchIP) && (
                          <button
                            onClick={() => {
                              setDateFilter("");
                              setSearchIP("");
                            }}
                            className="text-red-600 hover:text-red-700 font-medium text-sm sm:text-base"
                          >
                            Hapus filter untuk melihat semua data
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <table className="w-full min-w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                #
                              </th>
                              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">IP Address</span>
                                  <span className="sm:hidden">IP</span>
                                </div>
                              </th>
                              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Tanggal
                                </div>
                              </th>
                              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Waktu
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {currentItems.map((v, i) => {
                              const dateObj = new Date(v.VisitedDate);
                              const timeObj = new Date(v.CreatedAt);

                              const tanggal = !isNaN(dateObj.getTime())
                                ? dateObj.toLocaleDateString("id-ID", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "Invalid Date";

                              const jam = !isNaN(timeObj.getTime())
                                ? timeObj.toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  })
                                : "-";

                              return (
                                <tr
                                  key={v.ID}
                                  className="hover:bg-red-50 transition-colors duration-200 group"
                                >
                                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-100 to-rose-100 rounded-full text-xs sm:text-sm font-bold text-red-600 group-hover:from-red-200 group-hover:to-rose-200 transition-all duration-200">
                                      {indexOfFirstItem + i + 1}
                                    </div>
                                  </td>
                                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full shadow-md shadow-green-500/50 flex-shrink-0"></div>
                                      <span className="text-gray-900 font-mono text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg border border-gray-200 group-hover:bg-red-50 group-hover:border-red-200 transition-all duration-200 break-all">
                                        {v.IP || "-"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-gray-700 font-medium text-xs sm:text-sm">
                                    <span className="hidden sm:inline">{tanggal}</span>
                                    <span className="sm:hidden">
                                      {dateObj.toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short"
                                      })}
                                    </span>
                                  </td>
                                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-red-700 bg-red-100 rounded-full border border-red-200">
                                      <Clock className="w-3 h-3" />
                                      <span className="hidden sm:inline">{jam}</span>
                                      <span className="sm:hidden">
                                        {timeObj.toLocaleTimeString("id-ID", {
                                          hour: "2-digit",
                                          minute: "2-digit"
                                        })}
                                      </span>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                                Menampilkan {indexOfFirstItem + 1} -{" "}
                                {Math.min(
                                  indexOfLastItem,
                                  filteredVisitors.length
                                )}{" "}
                                dari {filteredVisitors.length} data
                              </div>

                              <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                                <button
                                  onClick={() => paginate(currentPage - 1)}
                                  disabled={currentPage === 1}
                                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-200"
                                >
                                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>

                                <div className="flex gap-1">
                                  {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                  ).map((pageNumber) => {
                                    // Mobile: show fewer pages
                                    const isMobile = window.innerWidth < 640;
                                    const showRange = isMobile ? 1 : 2;
                                    
                                    if (
                                      pageNumber === 1 ||
                                      pageNumber === totalPages ||
                                      (pageNumber >= currentPage - showRange &&
                                        pageNumber <= currentPage + showRange)
                                    ) {
                                      return (
                                        <button
                                          key={pageNumber}
                                          onClick={() => paginate(pageNumber)}
                                          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                                            currentPage === pageNumber
                                              ? "bg-red-500 text-white shadow-lg"
                                              : "text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200"
                                          }`}
                                        >
                                          {pageNumber}
                                        </button>
                                      );
                                    } else if (
                                      pageNumber === currentPage - (showRange + 1) ||
                                      pageNumber === currentPage + (showRange + 1)
                                    ) {
                                      return (
                                        <span
                                          key={pageNumber}
                                          className="px-1 sm:px-2 py-1.5 sm:py-2 text-gray-400 text-xs sm:text-sm"
                                        >
                                          ...
                                        </span>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>

                                <button
                                  onClick={() => paginate(currentPage + 1)}
                                  disabled={currentPage === totalPages}
                                  className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-200"
                                >
                                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
