// src/pages/Form.tsx
import Navigation from "./Navigation";

const Form = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-rose-600 mb-6">
            Formulir Request Pengiriman Azko
          </h1>

          <div className="relative w-full" style={{ paddingBottom: "1600px", height: 0 }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdeRLJKiPsOgKaumUHDXBI6lLlGzQZqN8Zpw-DMFr59xeVQKA/viewform?embedded=true"
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Formulir Request"
              allowFullScreen
            >
              Memuat…
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
