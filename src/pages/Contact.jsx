const Contact = () => {
  return (
    <section id="contact" className="padding-x py-16 bg-light-gray">
      <div className="max-container">
        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-dark-teal mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-gray">
            We're here to assist you! Reach out to us for any inquiries or support.
          </p>
        </header>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-dark-teal mb-4">Contact Information</h2>
            <p className="text-lg text-dark-gray mb-6">
              <strong>Tel:</strong> (+233) 024 604 0842
            </p>
            <p className="text-lg text-dark-gray">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:aaaconasara@gmail.com"
                className="text-coral-red hover:underline"
              >
                aaaconasara@gmail.com
              </a>
            </p>
          </div>

          {/* Google Map Embed */}
          <div className="w-full h-[300px] md:h-[400px] border rounded-md overflow-hidden">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0841286487657!2d-122.40141442444496!3d37.79329524415616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808746f8c18f%3A0x123456789abcdef!2sYour+Company+Name!5e0!3m2!1sen!2s!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="text-2xl font-semibold text-dark-teal mb-6">Send Us a Message</h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-dark-teal"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-dark-teal"
              />
            </div>
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 rounded-md p-4 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-dark-teal"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="mt-6 bg-coral-red text-white py-3 px-8 rounded-md hover:bg-highlight-yellow transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
