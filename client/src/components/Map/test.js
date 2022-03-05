new daum.Postcode({
  oncomplete: function (data) {
    Promise.resolve(data)
      .then((o) => {
        const { address } = data;

        return new Promise((resolve, reject) => {
          const geocoder = new daum.maps.services.Geocoder();

          geocoder.addressSearch(address, (result, status) => {
            if (status === daum.maps.services.Status.OK) {
              const { x, y } = result[0];

              resolve({ lat: y, lon: x });
            } else {
              reject();
            }
          });
        });
      })
      .then((result) => {
        // 위, 경도 결과 값
      });
  },
  width: "100%",
  height: window.innerHeight,
}).on();
