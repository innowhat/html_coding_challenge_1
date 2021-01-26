(() => {
  const application = Stimulus.Application.start();

  application.register(
    "printer",
    class extends Stimulus.Controller {
      static get targets() {
        return [
          "name",
          "impacts",
          "climate_change",
          "energy_use",
          "production",
          "distribution",
          "use",
          "end_of_life",
        ];
      }
      connect() {
        this.loadPrinter();
      }
      change() {
        this.loadPrinter();
      }
      loadPrinter() {
        fetch(this.data.get("url"))
          .then((response) => response.json())
          .then((data) => {
            this.nameTarget.textContent = data.name;
            this.climate_changeTarget.textContent = Object.getOwnPropertyNames(
              data.impacts
            )[0];
            this.energy_useTarget.textContent = Object.getOwnPropertyNames(
              data.impacts
            )[1];
            if (this.impactsTarget.value == "0") {
              this.loadImpact(data.impacts.climate_change);
            } else this.loadImpact(data.impacts.energy_use);
          });
      }
      loadImpact(data) {
        this.productionTarget.setAttribute("height", `${data.production}%`);
        this.distributionTarget.setAttribute("height", `${data.distribution}%`);
        this.useTarget.setAttribute("height", `${data.use}%`);
        this.end_of_lifeTarget.setAttribute("height", `${data.end_of_life}%`);
      }
    }
  );
})();
