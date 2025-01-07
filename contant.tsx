export default function Contact() {
  return (
    <section id="contact" className="bg-white py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Contact Information
      </h2>
      <div className="text-center">
        <p>
          <a href="tel:+212629144679" className="text-blue-500 hover:underline">
            +212 629-144-679
          </a>
        </p>
        <p>
          <a
            href="mailto:moughamir@gmail.com"
            className="text-blue-500 hover:underline"
          >
            moughamir@gmail.com
          </a>
        </p>
        <p>
          <a
            href="https://linkedin.com/in/moughamir"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </p>
        <p>
          <a
            href="https://github.com/moughamir"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
