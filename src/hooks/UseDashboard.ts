import { useEffect } from "react";


// Hook
const UseDashboard = () => {
    return useEffect(() => {
        let toogle = document.querySelector(".toggle");
        let navigation = document.querySelector(".navigation");
        let main = document.querySelector(".main");
        let list = document.querySelectorAll(".navigation li");
        //toogle on click
        toogle!.addEventListener("click", () => {
          navigation!.classList.toggle("active");
          main!.classList.toggle("active");
        });
        //list on click
        list.forEach(item => {
            item.addEventListener("click", () => {
                //only if toogle is true
                if (!navigation!.classList.contains("active")) {
                    navigation!.classList.add("active");
                    main!.classList.add("active");
                }
            });
        });
        return () => {
          toogle!.removeEventListener("click", () => {
            navigation!.classList.toggle("active");
          });
        };
      }, []);
    }


  //export
    export {
        UseDashboard
    }
