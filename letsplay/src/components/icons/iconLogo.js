/* eslint-disable no-param-reassign */

import React from 'react';

function IconLogo({
  color = '#F39189',
  width = '36px',
  height = '50px',
  viewBox = '0 0 62 50',
  viewBoxLeft,
}) {
  if (viewBoxLeft) {
    const values = viewBox.split(' ');

    viewBox = `${viewBoxLeft + 5} ${values[1]} ${values[2]} ${values[3]}`;
  }

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 577.000000 476.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,476.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M4199 4753 l-86 -4 -20 -37 c-20 -36 -20 -41 -7 -202 7 -91 13 -220
            13 -288 1 -68 6 -132 11 -143 10 -17 22 -19 146 -19 l135 0 0 268 c0 147 0
            278 1 292 5 76 -1 98 -36 119 -18 12 -42 20 -52 19 -11 -1 -58 -4 -105 -5z"
        />
        <path
          d="M200 4509 c-75 -8 -88 -12 -107 -36 -21 -26 -23 -38 -23 -169 0 -116
            -5 -168 -31 -300 l-31 -159 4 -350 c4 -307 7 -354 22 -385 l17 -35 177 0 c97
            0 194 4 214 9 22 5 98 4 186 -3 140 -11 151 -10 207 9 46 16 79 20 140 18 l79
            -3 13 70 13 69 -33 34 -32 34 -150 -6 c-82 -4 -210 -8 -282 -9 l-133 -2 -10
            29 c-6 17 -10 162 -10 356 l0 328 -35 90 c-30 79 -36 110 -46 239 -12 145 -23
            185 -53 182 -6 -1 -49 -6 -96 -10z"
        />
        <path
          d="M3067 4370 c-67 -7 -79 -14 -106 -60 -5 -8 -12 -76 -16 -151 l-7
            -137 -165 0 c-206 -1 -207 -2 -201 -109 2 -53 9 -79 24 -99 33 -45 47 -50 106
            -37 29 6 87 8 128 6 l75 -5 0 -302 c0 -271 2 -306 18 -342 18 -39 20 -40 54
            -35 20 3 91 2 160 -3 85 -5 149 -4 207 4 95 13 96 14 96 106 0 98 -7 112 -71
            145 l-59 29 0 214 0 214 38 6 c20 4 51 2 69 -3 19 -5 47 -6 70 0 21 5 67 9
            104 9 l65 0 -7 63 c-8 76 -16 97 -38 97 -47 1 -353 29 -357 33 -2 2 -11 77
            -19 166 -8 89 -21 170 -27 181 -14 21 -24 22 -141 10z"
        />
        <path
          d="M5365 4291 c-70 -20 -155 -56 -240 -101 -59 -31 -145 -111 -145 -134
            0 -7 -4 -16 -10 -22 -15 -15 -20 -142 -8 -170 6 -14 41 -44 77 -68 36 -24 75
            -53 85 -65 11 -12 39 -26 62 -32 24 -6 51 -20 61 -30 10 -11 24 -25 31 -32 8
            -6 31 -30 53 -52 67 -69 46 -130 -55 -156 -22 -6 -65 -17 -94 -25 -54 -16
            -221 -22 -241 -9 -8 4 -10 -5 -6 -32 3 -21 7 -54 9 -73 5 -55 32 -63 142 -44
            66 12 112 14 179 8 154 -13 187 -9 286 36 49 22 93 40 98 40 4 0 26 13 48 29
            58 42 74 90 64 185 -12 102 -30 122 -190 204 -89 47 -147 85 -191 125 -62 58
            -63 59 -63 113 0 65 11 80 81 110 28 13 52 28 52 33 0 11 125 51 158 51 40 0
            52 11 52 49 0 42 -7 54 -37 70 -32 16 -188 12 -258 -8z"
        />
        <path
          d="M1898 3915 c-2 -3 -49 -14 -104 -25 -54 -11 -122 -32 -151 -46 -66
            -32 -151 -124 -218 -235 -47 -78 -50 -88 -54 -162 -4 -95 12 -143 69 -206 22
            -25 40 -48 40 -53 0 -4 14 -8 31 -8 17 0 51 -12 77 -27 45 -27 53 -28 215 -31
            151 -3 181 -1 285 22 65 14 142 28 172 31 36 4 65 14 84 29 27 22 28 26 16 60
            -6 19 -16 38 -21 42 -6 3 -32 -3 -58 -15 -63 -27 -318 -41 -402 -22 -85 20
            -119 32 -119 43 0 5 -11 23 -25 39 -13 16 -27 44 -30 63 -9 46 12 184 33 220
            37 65 243 100 291 50 23 -23 34 -74 22 -93 -5 -8 -44 -20 -88 -28 -157 -27
            -158 -27 -155 -48 1 -11 5 -37 9 -57 l6 -38 51 0 c80 1 184 18 276 46 68 21
            91 34 114 61 l29 35 -21 71 c-28 96 -70 187 -87 187 -7 0 -22 11 -33 25 -11
            14 -25 25 -32 25 -7 0 -24 6 -38 14 -50 25 -169 46 -184 31z"
        />
        <path
          d="M995 1950 c-38 -4 -101 -8 -140 -9 -40 -1 -77 -7 -87 -15 -13 -10
            -31 -10 -77 -3 -51 8 -62 7 -85 -9 l-25 -19 -1 -407 0 -408 -22 0 -23 0 5
            -302 c3 -167 7 -304 8 -305 7 -9 52 0 62 12 10 12 38 15 129 15 105 0 118 2
            143 23 l27 22 3 201 3 201 40 10 c114 32 471 164 520 194 71 42 161 122 180
            160 32 61 7 226 -51 342 -15 28 -51 77 -82 109 -90 95 -187 139 -331 154 -50
            4 -75 12 -87 25 -9 11 -22 18 -28 17 -6 0 -42 -4 -81 -8z m94 -280 c47 -12
            116 -25 154 -30 95 -14 163 -45 193 -89 13 -20 24 -42 24 -49 0 -24 -103 -162
            -125 -167 -103 -25 -376 -75 -406 -75 l-37 0 -6 68 c-4 37 -9 129 -12 206 -5
            111 -4 140 7 147 24 15 121 10 208 -11z"
        />
        <path
          d="M2194 1860 l-110 -59 -12 -51 c-7 -30 -12 -135 -12 -253 -1 -120 -12
            -358 -29 -587 -26 -356 -27 -386 -12 -404 14 -17 26 -18 117 -12 65 3 114 2
            134 -5 26 -10 37 -8 66 7 l34 19 0 313 c0 305 -19 628 -40 679 -6 14 -4 40 6
            75 8 33 14 103 14 185 0 121 -2 133 -19 143 -11 5 -21 10 -23 10 -2 0 -53 -27
            -114 -60z"
        />
        <path
          d="M3469 1799 c-8 -5 -47 -9 -87 -9 -58 0 -102 -9 -205 -41 -154 -48
            -217 -78 -246 -115 -25 -31 -27 -50 -6 -58 8 -3 29 -28 46 -56 19 -31 38 -50
            49 -50 10 0 67 15 127 34 155 48 291 78 343 74 35 -2 47 -8 56 -27 7 -13 24
            -35 39 -48 18 -17 24 -31 19 -42 -3 -9 -9 -43 -13 -76 l-6 -60 -89 -8 c-60 -5
            -103 -15 -135 -31 -25 -13 -62 -26 -81 -29 -42 -8 -204 -69 -280 -105 -79 -39
            -171 -129 -203 -199 -36 -82 -52 -185 -37 -242 16 -61 95 -143 179 -184 l65
            -32 189 -3 c179 -3 191 -2 211 17 41 39 81 38 193 -3 39 -14 51 -14 143 1 94
            17 101 17 129 0 40 -23 46 -22 70 17 20 32 21 40 11 157 -6 68 -10 174 -10
            234 0 116 -17 243 -42 310 -9 22 -19 70 -23 105 -4 36 -13 90 -21 120 -8 30
            -14 76 -14 102 0 26 -4 48 -10 48 -18 0 -49 43 -70 100 -33 89 -46 97 -171
            103 -59 2 -113 1 -120 -4z m31 -703 l45 -13 -1 -99 c0 -55 -4 -133 -8 -175
            l-9 -77 -61 -6 c-94 -9 -398 -27 -400 -24 -34 48 -46 82 -46 129 0 101 35 170
            104 206 47 25 224 70 281 72 28 0 70 -5 95 -13z"
        />
        <path
          d="M5166 1352 c-29 -38 -72 -104 -94 -148 -22 -44 -47 -86 -56 -93 -8
            -7 -22 -34 -31 -61 -10 -30 -24 -51 -36 -55 -10 -4 -23 -14 -29 -24 -5 -10
            -19 -21 -30 -24 -32 -8 -226 163 -370 326 -115 129 -124 137 -158 137 -72 0
            -141 -13 -146 -27 -3 -7 40 -86 95 -175 55 -89 111 -183 124 -209 16 -31 69
            -89 155 -170 71 -67 130 -128 130 -135 0 -7 7 -17 16 -22 15 -8 -4 -50 -134
            -303 l-150 -294 19 -37 c21 -41 41 -47 73 -23 15 11 48 15 125 15 96 1 108 3
            132 24 15 12 34 47 43 77 42 130 105 271 164 366 54 86 63 108 59 135 -6 41
            17 82 70 125 30 24 48 53 83 134 24 57 65 136 92 176 105 158 148 250 148 320
            l0 33 -120 0 -119 0 -55 -68z"
        />
      </g>
    </svg>
  );
}

export default IconLogo;
