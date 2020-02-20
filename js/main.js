;
(function(){
	var app = new Vue({
		el: '.section',
		data: {
			tomorrow_t: 0,
			tomorrow_p: '',
			tomorrow_d: '',
			dataString_tomorrow :'',
			tomorrow_t_avg: 0,
			after_tomorrow_t: 0,
			after_tomorrow_p: '',
			after_tomorrow_d: '',
			dataString_after_tomorrow :'',
			after_tomorrow_t_avg: 0,
			after_td_a_tomorrow_t: 0,
			after_td_a_tomorrow_p: '',
			after_td_a_tomorrow_d: '',
			dataString_after_td_a_tomorrow :'',
			after_td_a_tomorrow_t_avg: 0,

		},

		methods: {
			// Получаю данные с сервера
			temperature(event){
				axios({
					url: 'https://api.openweathermap.org/data/2.5/forecast?q=Rostov-on-Don&appid=ad61841ebc5b6a9e5a297b7b32768cf0&lang=ru' ,
 					method: 'GET',
 					headers: {"Content-Type": "application/json"}
				})
				.then(function(response, text, request){
					console.log(response);
					app.tomorrow_t = response.data.list[8].main.temp;
					app.tomorrow_p = response.data.list[8].weather[0].icon;
					app.tomorrow_d = response.data.list[8].weather[0].description;
					app.after_tomorrow_t = response.data.list[16].main.temp;
					app.after_tomorrow_p = response.data.list[16].weather[0].icon;
					app.after_tomorrow_d = response.data.list[16].weather[0].description;
					app.after_td_a_tomorrow_t = response.data.list[24].main.temp;
					app.after_td_a_tomorrow_p = response.data.list[24].weather[0].icon;
					app.after_td_a_tomorrow_d = response.data.list[24].weather[0].description;

					// высчитываю среднюю температуру
					var summ = 0;
					for (var i = 0; i <= 8; i++) {
						summ += response.data.list[i].main.temp;
					}
					app.tomorrow_t_avg = summ/9;
					
					summ = 0;
					for (var i = 8; i <= 16; i++) {
						summ += response.data.list[i].main.temp;
					}
					app.after_tomorrow_t_avg = summ/9;

					summ = 0;
					for (var i = 16; i <= 24; i++) {
						summ += response.data.list[i].main.temp;
					}
					app.after_td_a_tomorrow_t_avg = summ/9;

					// Каректирую даты с гг.мм.дд на дд.мм.гг и убираю время
					var date = response.data.list[8].dt_txt.substring(0, response.data.list[8].dt_txt.indexOf(' ')).split("-");
					app.dataString_tomorrow = date[2]+'.'+date[1]+'.'+date[0];
					date = response.data.list[16].dt_txt.substring(0, response.data.list[16].dt_txt.indexOf(' ')).split("-");
					app.dataString_after_tomorrow = date[2]+'.'+date[1]+'.'+date[0];
					date = response.data.list[24].dt_txt.substring(0, response.data.list[24].dt_txt.indexOf(' ')).split("-");
					app.dataString_after_td_a_tomorrow = date[2]+'.'+date[1]+'.'+date[0];
				})
			},
			// Перевожу кельвины в цельсия
			kelvin_to_celsius(kelvin){
				var celsius = (kelvin -273.15).toFixed(0)
				return (celsius > 0) ? '+'+celsius : (celsius)
			}
		},
		mounted: function(){
			this.temperature()
		}
	})
}())