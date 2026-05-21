import { useEffect, useRef } from 'react';
import '../styles/RedsharkBikes.css';

const RedsharkBikesPage = () => {
    const topoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleMouseMove = (e) => {
            if (topoRef.current) {
                const x = (e.clientX / window.innerWidth) * 20;
                const y = (e.clientY / window.innerHeight) * 20;
                topoRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const models = [
        {
            id: 'enjoy',
            name: 'ENJOY',
            prefix: 'Bike Surf',
            videoUrl: 'https://www.youtube.com/embed/2N3aGGV4nhc' 
        },
        {
            id: 'fitness',
            name: 'FITNESS',
            prefix: 'Bike Surf',
            videoUrl: 'https://www.youtube.com/embed/Nu5RBJZInFU'
        },
        {
            id: 'adventure',
            name: 'ADVENTURE',
            prefix: 'Bike Surf',
            videoUrl: 'https://www.youtube.com/embed/qiGsPudGtVI'
        },
        {
            id: 'scooter',
            name: 'Surf',
            prefix: 'E-SCOOTER',
            videoUrl: 'https://www.youtube.com/embed/Q3ZjqRujv1E'
        }
    ];

    return (
        <div className="redshark-page">
            <svg ref={topoRef} className="rs-topo-bg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,200 C200,150 300,300 500,250 S800,100 1000,150" />
                <path d="M0,400 C150,350 250,550 450,450 S750,300 1000,350" />
                <path d="M0,600 C250,550 350,750 550,650 S850,500 1000,550" />
                <path d="M0,800 C100,750 200,950 400,850 S700,700 1000,750" />
            </svg>

            <div className="redshark-container">
                <header className="redshark-header">
                    <span className="redshark-subtitle">WATER BIKES COLLECTION</span>
                    <h1 className="redshark-title">Redshark</h1>
                </header>

                <div className="redshark-grid">
                    {models.map((model, index) => (
                        <div 
                            key={model.id} 
                            className="redshark-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="redshark-video-wrapper">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={model.videoUrl} 
                                    title={`${model.prefix} ${model.name}`} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="redshark-info">
                                <h3 className="redshark-prefix">{model.prefix}</h3>
                                <h2 className="redshark-model-name">{model.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RedsharkBikesPage;
