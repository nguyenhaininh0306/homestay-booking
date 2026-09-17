import Image from 'next/image';

// Luoi anh phu thuoc so anh phu, tranh de trong o nhu khi hard-code 2x2
const THUMB_GRID = {
  1: 'grid-cols-1 grid-rows-1',
  2: 'grid-cols-1 grid-rows-2',
  3: 'grid-cols-2 grid-rows-2',
  4: 'grid-cols-2 grid-rows-2',
};

/**
 * Luoi anh kieu Airbnb: anh bia chiem nua trai, anh con lai xep ben phai.
 * Chi co 1 anh thi anh bia tran toan bo chieu ngang.
 */
const Gallery = ({ images = [], title }) => {
  if (images.length === 0) {
    return <div className="h-[320px] w-full rounded-card bg-surface sm:h-[420px]" />;
  }

  const [cover, ...rest] = images;
  const thumbs = rest.slice(0, 4);
  const hasThumbs = thumbs.length > 0;

  return (
    <div
      className={`grid h-[320px] gap-2 overflow-hidden rounded-card sm:h-[420px] ${
        hasThumbs ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      }`}
    >
      <div className="relative h-full w-full">
        <Image
          src={cover}
          alt={title}
          fill
          sizes={hasThumbs ? '(max-width: 768px) 100vw, 50vw' : '100vw'}
          priority
          className="object-cover transition hover:brightness-90"
        />
      </div>

      {hasThumbs && (
        <div className={`hidden gap-2 md:grid ${THUMB_GRID[thumbs.length]}`}>
          {thumbs.map((src, index) => (
            <div
              key={src}
              // 3 anh phu: anh cuoi trai rong ca hang de khong ho luoi
              className={`relative h-full w-full ${
                thumbs.length === 3 && index === 2 ? 'col-span-2' : ''
              }`}
            >
              <Image
                src={src}
                alt={`${title} - ảnh ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition hover:brightness-90"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
