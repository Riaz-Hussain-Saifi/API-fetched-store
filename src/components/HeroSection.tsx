interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function HeroSection({ title, subtitle, imageUrl }: HeroSectionProps) {
  return (
    <div
      className="relative h-96 flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-6 rounded">
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-lg text-white">{subtitle}</p>
      </div>
    </div>
  );
}