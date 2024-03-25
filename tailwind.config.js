tailwind.config = {
	darkMode: "class",
	theme: {
		screens: {
			sm: "600px",
			// => @media (min-width: 576px) { ... }

			md: "960px",
			// => @media (min-width: 960px) { ... }

			lg: "1024px",
			// => @media (min-width: 1440px) { ... }
		},
		extend: {
			fontFamily: {
				Lora: ['"Lora"'],
				Roboto: ['"Roboto"'],
			},

			colors: {
				colPpal: "#A3C3F2",
				colSec: "#3F5A9F",
				colVentModalFondo: "#3233348F", 
				rojo: "#C11414",
				verde: "#339433"
			},
			customPosition: {
				posVentModal: {
          			position: 'absolute',
          			top: '130px',
					height: '150px',
        		},
			},			
		},
	},
};
