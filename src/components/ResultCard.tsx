import { Package, Phone } from "lucide-react";
import { waLink } from "../utils/waLink";
import { parseDeliveryDate } from "../utils/parseDeliveryDate";

// Tipe data
export interface DataItem {
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
  nopol: string;
}

// WhatsAppIcon
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor">
    <path
      d="M16.003 2.933c-7.23..."
      fill="#25D366"
    />
  </svg>
);

// Subkomponen: ContactCard
const ContactCard = ({ label, name, phone }: { label: string; name: string; phone: string }) => {
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
          </a>
        )}
      </div>
    </div>
  );
};

// Komponen Utama: ResultCard
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
          <div className="font-medium text-xs sm:text-sm text-red-600 break-words" title={item.noOrder}>{item.noOrder}</div>
          <div className="text-gray-500">Kode Store:</div>
          <div className="font-semibold">{item.kodeStore}</div>
          <div className="text-gray-500">Store Booking:</div>
          <div className="font-semibold">{item.storeName}</div>
          <div className="text-gray-500">Nama:</div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-gray-500">No LC:</div>
          <div className="font-semibold">{item.noLC} &nbsp; {item.nopol}</div>
          <div className="text-gray-500">Delivery Date:</div>
          <div className="font-semibold text-red-500">{parseDeliveryDate(item.noLC)}</div>
          <div className="text-gray-500">Delivery:</div>
          <div className="font-semibold text-green-600">{item.delivery}</div>
          <div className="text-gray-500">Via Hub:</div>
          <div className="font-semibold">{item.viaHub}</div>
          <div className="text-gray-500">Status:</div>
          <div className={`font-semibold ${item.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>{item.status}</div>
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

export default ResultCard;
