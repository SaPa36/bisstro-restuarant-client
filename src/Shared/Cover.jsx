import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
    return (
        <Parallax
            blur={{ min: -5, max: 5 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={200}
            // This is the magic part to fix the image scaling without a CSS file:
            bgImageStyle={{
                objectFit: 'cover',
                height: '100%',
                width: '100%'
            }}
        >
            <div className="hero h-[500px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl bg-black/50 px-20 py-16">
                        <h1 className="mb-5 text-6xl font-bold uppercase">{title}</h1>
                        <p className="mb-5 uppercase">
                            Would you like to try a dish?
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;