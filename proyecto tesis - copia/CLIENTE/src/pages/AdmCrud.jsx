
import { Link } from "react-router-dom";
function LoginAdm() {
  return (
    <div>
      {/* Header */}
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold text-white">Crud </h1>
        <p className="text-md text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          fugit doloremque molestias recusandae labore repellat amet dicta tempore
          necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
          quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
          ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
          officia accusantium vitae doloremque, molestias modi.
        </p>
        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>
      </header>
      {/* Services Section */}
      <section className="bg-gray-200 p-10">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <div className="flex flex-wrap">
          {/* Add individual service items here */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <h3 className="text-xl font-bold mb-2">Service 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <h3 className="text-xl font-bold mb-2">Service 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <h3 className="text-xl font-bold mb-2">Service 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-white p-10">
        <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
        <div className="flex flex-wrap">
          {/* Add individual testimonial items here */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <blockquote className="text-lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>
            <p className="text-gray-600">- Client 1</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <blockquote className="text-lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>
            <p className="text-gray-600">- Client 2</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <blockquote className="text-lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>
            <p className="text-gray-600">- Client 3</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default LoginAdm;