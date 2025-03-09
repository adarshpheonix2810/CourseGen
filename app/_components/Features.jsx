import React from 'react'
import FlipCard from '../../components/ui/flip-card';

function Features() {
  return (
    
    <div className="p-8 pt-12 overflow-hidden bg-black bg-cover bg-no-repeat bg-center bg-fixed">
        <h1 className="text-5xl font-extrabold text-center pb-4 mb-2 text-gray-400">
            Build Smarter, Learn Faster
        </h1>
        <h2 className="text-4xl font-semibold text-center bg-gradient-to-r from-[#f641ce] via-[#7507ca] to-[#3511eb] bg-clip-text text-transparent mb-8">
            Our Features
        </h2>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">  
                <FlipCard
                    description="Computer programming or coding is the composition of sequences of instructions, called programs, that computers can follow to perform tasks."
                    image="https://images.unsplash.com/photo-1525373698358-041e3a460346?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    rotate="y"
                    subtitle="What is programming?"
                    title="Programming"
                />
                <FlipCard
                    description="AI is the simulation of human intelligence processes by machines, especially computer systems."
                    image="https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D"
                    rotate="y"
                    subtitle="What is AI?"
                    title="Artificial Intelligence"
                />
                <FlipCard
                    description="Web development is the work involved in developing a website for the Internet or an intranet."
                    image="https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    rotate="y"
                    subtitle="What is Web Development?"
                    title="Web Development"
                />
                <FlipCard
                    description="Data science is a multi-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data."
                    image="https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169860.jpg?ga=GA1.1.889814760.1740568419&semt=ais_hybrid"
                    rotate="x"
                    subtitle="What is Data Science?"
                    title="Data Science"
                />
                <FlipCard
                    description="Machine learning is a subset of AI that enables systems to learn from data and improve over time without being explicitly programmed."
                    image="https://img.freepik.com/premium-photo/futuristic-robot-artificial-intelligence-concept_31965-6362.jpg?ga=GA1.1.889814760.1740568419&semt=ais_hybrid"
                    rotate="x"
                    subtitle="What is Machine Learning?"
                    title="Machine Learning"
                />
                <FlipCard
                    description="Blockchain is a decentralized digital ledger that records transactions across many computers in such a way that the registered transactions cannot be altered retroactively."
                    image="https://img.freepik.com/free-vector/technology-bitcoin-background-with-holographic-effect_1017-31521.jpg?ga=GA1.1.889814760.1740568419&semt=ais_hybrid"
                    rotate="x"
                    subtitle="What is Blockchain?"
                    title="Blockchain"
                />
            </div>
        </div>
    </div>
  )
}

export default Features