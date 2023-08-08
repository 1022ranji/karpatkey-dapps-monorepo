import React from 'react'

const CoW = (props: any) => (
  <svg
    fill="none"
    style={{ width: 'inherit', height: 'inherit' }}
    {...props}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1="87"
      x2="406.558"
      y1="440"
      y2="103.193"
    >
      <stop offset="0" stopColor="#ffe7e0" />
      <stop offset=".34375" stopColor="#f8dbf4" />
      <stop offset=".6875" stopColor="#c4ddff" />
      <stop offset="1" stopColor="#cae9ff" />
    </linearGradient>
    <circle cx="256" cy="256" fill="#052b65" r="256" />
    <g fill="url(#a)">
      <path d="m255.639 305.398c-64.456 0-116.705 30.131-116.705 67.302 0 37.17 52.249 67.3 116.705 67.3s116.704-30.131 116.704-67.3c0-37.17-52.251-67.302-116.704-67.302zm-56.034 75.948c-11.83 5.782-22.847 0-24.96-13.111-2.316-14.046 16.585-47.428 20.935-22.185 4.347 25.241 23.699-10.056 23.818 5.741-.647 12.754-8.254 24.115-19.793 29.555zm144.104-13.111c-2.112 13.111-13.129 18.893-24.956 13.111-11.542-5.44-19.149-16.801-19.793-29.555.118-15.797 19.468 19.5 23.818-5.741 4.347-25.243 23.245 8.139 20.931 22.185z" />
      <path d="m424.031 149.568c-3.348-23.966-84.293-6.874-94.812-5.063-.54.092-1.045-.369-.934-.905 1.07-5.371 1.845-19.89-8.425-23.034-6.566-2.011-10.895 1.7-13.465 5.444-1.15 1.68-4.593 8.94-6.732 13.981-1.152 2.721-3.836 6.699-6.788 6.627-12.377-3.858-24.808-5.788-37.236-5.788-12.431 0-24.862 1.93-37.239 5.788-2.952.072-5.638-3.906-6.791-6.627-2.138-5.041-5.581-12.301-6.732-13.981-2.568-3.744-6.896-7.455-13.462-5.444-10.27 3.144-9.498 17.663-8.425 23.034.108.536-.396.997-.934.905-10.519-1.811-91.4642-18.903-94.8145 5.063-3.1779 22.732 25.5285 54.082 55.5655 68.171 2.9 1.36 5.206 3.658 8.015 5.188 4.727 2.577 7.548 9.008 6.855 14.808v83.713l10.967-6.3c16.716-9.59 34.165-14.077 47.597-16.74h.476c10.733-2.384 21.689-3.61 32.684-3.662h12.473c10.992.052 21.949 1.278 32.684 3.662h.474c13.434 2.663 30.881 7.15 47.601 16.74l10.967 6.3v-83.713c-.695-5.8 2.123-12.231 6.85-14.808 2.815-1.53 5.115-3.828 8.015-5.188 30.037-14.09 58.746-45.439 55.566-68.171zm-176.204 85.823c-.464 2.484-6.387 7.057-21.072 10.847-10.283 2.591-20.982 3.556-31.566 2.902-2.488-.157-4.981-.572-7.29-1.514-4.212-1.716-7.77-4.667-10.418-8.555-3.575-5.078-5.278-10.731-4.187-16.843 1.063-6.119 4.593-10.851 9.688-14.395 3.816-2.75 8.167-4.304 12.712-4.473 2.488-.09 4.976.369 7.364 1.078 10.169 3.007 19.896 7.583 28.673 13.539 12.506 8.59 16.51 14.918 16.096 17.414zm85.967 3.68c-2.645 3.888-6.206 6.839-10.419 8.555-2.305.942-4.801 1.357-7.287 1.514-10.584.654-21.285-.312-31.568-2.902-14.688-3.79-20.606-8.363-21.069-10.847-.415-2.497 3.587-8.824 16.095-17.414 8.777-5.957 18.501-10.532 28.673-13.539 2.388-.709 4.874-1.168 7.365-1.078 4.541.169 8.898 1.723 12.711 4.473 5.095 3.544 8.626 8.273 9.686 14.392 1.091 6.112-.613 11.768-4.187 16.846z" />
    </g>
  </svg>
)
export default CoW