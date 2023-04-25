const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dominant: '#ffffff',
				inverted: '#000000',
				complementary: '#424242',
				accent: '#48A5E3',
				'light-accent': '#5c17eb10',
				muted: '#F5F5F7',
				'light-muted': '#7C7C7C2B',
				error: '#d74c4c',
				okay: '#2DB00C'
			},
			textColor: {
				skin: {
					base: '#212427',
					inverted: '#efefef',
					muted: '#7A7A7C',
					error: '#d74c4c',
					okay: '#2DB00C'
				}
			},
			borderColor: {
				base: '#DFDFE1'
			},
			backgroundImage: {
				'gradient-dominant': `linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);`
			},
			screens: {
				'-2xl': { max: '1535px' },
				'-xl': { max: '1279px' },
				'-lg': { max: '1023px' },
				'-md': { max: '767px' },
				'-sm': { max: '639px' },
				'@md': { min: '640px', max: '767px' },
				'@lg': { min: '768px', max: '1023px' },
				'@xl': { min: '1024px', max: '1279px' },
				'@2xl': { min: '1280px', max: '1535px' }
			},
			animation: {
				'gradient-text': 'gradient-text 5s ease infinite',
				scale: 'scale 250ms ease-in-out',
				fade: 'fade 700ms ease-in-out'
			},
			keyframes: {
				'gradient-text': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/line-clamp')]
};

module.exports = config;
