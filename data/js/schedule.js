const { window, document, Date } = require("globalthis/implementation");

window.$ = window.jQuery = require('jquery');

$(document).ready(() => {
  $(document).ready(() => {
    const date = new Date();

    if (date.getMonth() + 1 > 9 && date.getDate() > 9) {
      document.querySelector('#date_id')
        .defaultValue = date.getFullYear() + '-' + (date.getMonth() + 1)
        + '-' + date.getDate();
    } else if (date.getMonth() + 1 < 9 && date.getDate() < 9) {
      document.querySelector('#date_id').defaultValue = date.getFullYear()
        + '-' + '0' + (date.getMonth() + 1) + '-' + '0' + date.getDate();
    } else if (date.getMonth() + 1 < 9 && date.getDate() > 9) {
      document.querySelector('#date_id').defaultValue = date.getFullYear() + '-' 
      + '0' + (date.getMonth() + 1) + '-' + date.getDate();
    } else if (date.getMonth() + 1 > 9 && date.getDate() < 9){
      document.querySelector('#date_id').defaultValue = data.getFullYear() + '-'
      + (date.getMonth() +1 ) + '-' + '0' + date.getDate();
    }

    const date_actualy = document.querySelector('#date_id').value;
    const searchSchedule = require('../js/db_functions');

    searchSchedule.SearchSchedule(date_actualy);
  });
});

// Open Schedule
document.querySelector('#btn_abrir_agend').onclick = () => {
  document.querySelector('.agendamento_container').style.zIndex = '885';
}

// Close Schedule
document.querySelector('#btn_fechar_agd').onclick = () => {
  document.querySelector('#horario_value').value = "";
  document.querySelector('#cliente_value').value = "";
  document.querySelector('#servico_value').value = "";
  document.querySelector('#funcionario_value').value = "";
  document.querySelector('.agendamento_container').style.zIndex = '-500';
}

// Save schedule
document.querySelector('#btn_salvar_agd').onclick = () => {
  try {
    const lb_day = document.querySelector('#date_id').value;
    const lb_schedule = document.querySelector('#horario_value').value;
    const lb_client = document.querySelector('#cliente_value').value;
    const lb_service = document.querySelector('#servico_value').value;
    const lb_employee = document.querySelector('#funcionario_value').value;
    const db_save_schedule = require('../js/db_functions');

    if (lb_schedule != "" && lb_client != "" && lb_service != "" && lb_employee != "") {
      db_save_schedule.NewSchedule(lb_day, lb_schedule, lb_client, lb_service, lb_employee);
      document.querySelector('#horario_value').value = "";
      document.querySelector('#cliente_value').value = "";
      document.querySelector('#servico_value').value = "";
      document.querySelector('#funcionario_value').value = "";
    } else {
      document.querySelector(".alert_container").style.zIndex = "999"
      document.querySelector(".alert_msg").innerHTML = "Todos os campos devem ser preenchidos";
    }
  } catch (error) {
    document.querySelector(".alert_container").style.zIndex = "999"
    document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: " + error;
  }
}

// Excluir um horário
function deleteSchedule(hour) {
  const deleting = require('../js/db_functions');
  deleting.DeleteSchedule(hour.id);  
}

// FUNCAO QUE BUSCA OS AGENDAMENTOS CONFORME O HORARIO SELECIONADO
document.querySelector('#date_id').onchange = () => {
  const showDays = require('../js/db_functions');
  showDays.SearchSchedule(document.querySelector('#date_id').value);
}
