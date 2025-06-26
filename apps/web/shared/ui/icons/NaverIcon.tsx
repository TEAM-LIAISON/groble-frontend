interface NaverIconProps {
  className?: string;
}

export default function NaverIcon({ className = 'w-5 h-5' }: NaverIconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0.25"
        width="24"
        height="24"
        rx="12"
        fill="url(#pattern0_2477_61471)"
      />
      <defs>
        <pattern
          id="pattern0_2477_61471"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2477_61471" transform="scale(0.00444444)" />
        </pattern>
        <image
          id="image0_2477_61471"
          width="225"
          height="225"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAxzz///8AxjcAxCZQ0Gjc9N/m9+jR8dbQ9Ntp2YMAxjgAxCwAxTAAxTP7//3p+Osfy01R1HC068Hx/PTL8tVIz2O77cfF7ct/3pXX9d8Awx+L4aA70F+Y5KlJ0mqn6LcszVWh5rB024yH4Jtg2oBa1Xau6bwozVMQgS/cAAACxklEQVR4nO3c7W7aQBBG4Vm7QPGabwqBkBSSpr3/O6yUKi0EbK8NjTKvzvPbWnHixWInks0AAAAAAAAAAAAAAAAAAAAAAAAAQEORJ4kJS8WbrXRLxbdFP8FknjcuFVeTlJXWH5yYfQlphmXTUvnXpIV6zX+rm0ouHE+LhqW8F4Zl0010XxjuGhL9FzbtU/+FYbOtXUqgMNzXPugVCsMuq1lKonAzqllKojA81OxTjcLwWH0XRQr78oXhe+UHVCkMs6q7KFM4sYqfNjKFYV7xPNUprDoqChUuLu9TocKwuvgTXKkwPF3ap1KFF4+KUoVheeF5qlUY7s4TxQrH+7Ojolhh2JzdRLXC85GGXOHZSEOvsPfuJuoVhsNpomDhu6OiYmE/O/5po1h4OtKQLDzZp5qFx0dFzcLjkYZo4dFIQ7Xw3z5VLQzrt08sW/h3pKFb+DbS0C0My1y9MDxH9cLx61FRuTBsSvXC15GGdmHYZ+qF/VK9MByiemGYbdUL+87v4aT5ksPSdeGPRfM1CZd85sKXtOv8Fg63P9ULS0v4KrouHI0e1QstP6gXWt5XL8x26oUWH9QLrdyoF2a7sXihxWf1wtRjruPCwq7dp5+90Mon9UKLa/XCYpp2DvRbaOVQvdDyuXphMbpmn3ootNE1Iw0XhRavGGn4KCyy7kdFH4U2mqkXXjHS8FJoses+dVPYeaThptDivXqhld2Oio4KO440HBV2HGl4KrRt2n8MHRd2Gmm4Kuw00vBVaHGlXthhpOGssMNIw1th+5GGu8Iia7lP3RW2Pir6K2x7VHRYWBStjooOC1vuU4+FFg/qhRZ76oXZL/XCNiMNp4UtRhpeC7N96lHRa6HFO/VCyxNHGh9dWOx6gwSbl7r3ev5ZaZqy0GBQ9TK0/ybxjeWNgTd99zkAAAAAAAAAAAAAAAAAAAAAAAAACb8BlaxF0SY61+4AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}
