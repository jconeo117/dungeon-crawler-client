import React from "react"

const HomePage = () =>{

    const heroStyle = {
        backgroundImage: `linear-gradient(to top, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 1) 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return(
        <main>
            <section style={heroStyle} className="hero-bg min-h-screen flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-6xl md:text-8xl font-bold font-cinzel text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
                    Forja tu Leyenda
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto drop-shadow-md">
                    Sumérgete en un mundo de fantasía oscura, explora mazmorras traicioneras y enfréntate a criaturas de pesadilla. El botín y la gloria te esperan.
                </p>
                <div className="mt-8">
                    <a href="#features" className="bg-transparent border-2 border-emerald-500 text-emerald-400 font-bold px-8 py-3 rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300">
                        Descubre Más
                    </a>
                </div>
            </div>
        </section>
        </main>
    )
}

export default HomePage;