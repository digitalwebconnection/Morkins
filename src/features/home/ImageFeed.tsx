
const IMAGES = [
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUeNMSMlVE4ESLjMd56rUTifmJ-rMfwUAWbGUIEEIHRjZ2rsdpkMUjnUe&s=10",
  "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80",
  "https://hips.hearstapps.com/hmg-prod/images/best-korean-skincare-brands-6733bba672bc1.png?crop=0.502xw:1.00xh;0.498xw,0&resize=640:*",
  "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVxiBkVbL9dKz9f5G9no60lhvEFK830MYjnxHr95pdGA&s=10",
];

export default function ImageFeed() {
  return (
    <section className="bg-[#D8D9D7] text-[#6F8C51] overflow-hidden border-b border-[#A5A686]/30">
      <div className="relative animate-fade-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 transition-transform duration-300">
          {IMAGES.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className="group relative aspect-[5/4] overflow-hidden transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl"
            >
              <img
                src={img}
                alt={`Skincare Routine ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
