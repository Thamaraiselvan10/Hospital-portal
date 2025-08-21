 function toggleMenu() {
      document.getElementById("sidebar").classList.toggle("active");
    }

    const monthYearEl = document.getElementById('month-year');
    const calendarDaysEl = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();
    let selectedDate = null;

    const renderCalendar = () => {
      const today = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
      
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      calendarDaysEl.innerHTML = '';

      // Previous month's days
      for (let i = firstDayOfMonth; i > 0; i--) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day', 'inactive');
        dayEl.textContent = daysInPrevMonth - i + 1;
        calendarDaysEl.appendChild(dayEl);
      }

      // Current month's days
      for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');
        dayEl.textContent = i;
        const date = new Date(year, month, i);

        // Check if the date is in the past
        if (date < today.setHours(0,0,0,0)) {
           dayEl.classList.add('inactive');
        } else {
           dayEl.addEventListener('click', () => {
            // Remove previous selection
            if(selectedDate) {
              const prevSelected = document.querySelector('.calendar-day.selected');
              if(prevSelected) prevSelected.classList.remove('selected');
            }
            
            dayEl.classList.add('selected');
            selectedDate = date;
            
            // Format date as YYYY-MM-DD for the function
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            generateTimeSlots(dateStr);
          });
        }
        
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dayEl.classList.add('today');
        }
        
        calendarDaysEl.appendChild(dayEl);
      }
    };
    
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    function generateTimeSlots(selectedDate) {
      const container = document.getElementById("timeSlots");
      container.innerHTML = ""; // Clear existing slots
      
      const startTime = 9 * 60;
      const endTime = 17 * 60;
      const interval = 30;
      
      for (let minutes = startTime; minutes < endTime; minutes += interval) {
        let hour = Math.floor(minutes / 60);
        let min = minutes % 60;
        
        let suffix = hour >= 12 ? "PM" : "AM";
        let displayHour = hour % 12;
        displayHour = displayHour === 0 ? 12 : displayHour;
        
        let displayMin = min.toString().padStart(2, "0");
        
        const slot = document.createElement("div");
        slot.className = "time-slot";
        slot.textContent = `${displayHour}:${displayMin} ${suffix}`;
        
        slot.onclick = () => {
          const currentActive = document.querySelector(".time-slot.active");
          if(currentActive) {
            currentActive.classList.remove("active");
          }
          slot.classList.add("active");
        };
        container.appendChild(slot);
      }
    }

    // Initial render
    renderCalendar();
    generateTimeSlots(new Date().toISOString().slice(0, 10)); // Generate for today initially