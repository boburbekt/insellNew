import Swal from "sweetalert2";
import type { SweetAlertIcon } from 'sweetalert2';


import store from "@/store";
export default {
  roles: [
    {
      value: 'driver',
      title: 'Haydovchi'
    },
    {
      value: 'operator',
      title: 'Operator'
    },
    {
      value: 'branch_admin',
      title: 'Korxona admin'
    },
    {
      value: 'yuvuchi',
      title: 'Yuvuchi'
    },
    {
      value: 'qadoqlovchi',
      title: 'Qadoqlovchi'
    },
    {
      value: 'kassir',
      title: 'Kassir'
    },
    {
      value: 'savdo_admin',
      title: 'Savdo admin'
    },
    {
      value: 'kuzatuvchi',
      title: 'Kuzatuvchi'
    },
    {
      value: 'joyda_yuvuchi',
      title: 'Joyda yuvuchi'
    },
  ],
  roleValue(role: string) {
    return this.roles.find((e) => e.value === role)?.title || '';
  },
  types: [
    {
      value: 'price',
      title: 'Narx'
    },
    {
      value: 'quality',
      title: 'Sifat'
    },
    {
      value: 'premium',
      title: 'Premium'
    },
    {
      value: 'black_list',
      title: "Qora ro'yxat"
    },
  ],
  typeValue(type: string) {
    return this.types.find((e) => e.value === type)?.title || '';
  },
  orderStatus: [
    {
      value: 'create_order',
      title: "BUYRTMA OLISH"
    },
    {
      value: 'keltirish',
      title: "KELTIRISH"
    },
    {
      value: 'yuvish',
      title: "YUVISH"
    },
    {
      value: 'qadoqlash',
      title: "QADOQLASH"
    },
    {
      value: 'joyda_yuvish',
      title: "JOYDA YUVISH"
    },
    {
      value: 'topshiruv',
      title: "TOPSHIRUV"
    },
    {
      value: 'topshirildi',
      title: "TOPSHIRILDI"
    }, {
      value: 'tugallandi',
      title: "TUGALLANDI"
    },
    {
      value: 'ombor',
      title: "OMBOR"
    }
  ],
  orderStatusValue(status: string) {
    return this.orderStatus.find((e) => e.value === status)?.title || '';
  },
  olchov: [
    {
      value: 'kg',
      title: 'kg'
    },
    {
      value: 'kv m',
      title: 'kv m'
    },
    {
      value: 'metr',
      title: 'm'
    },
    {
      value: 'dona',
      title: 'dona'
    },
    {
      value: 'o\'rin',
      title: 'orin'
    }
  ],
  olchovRaw: [
    {
      value: 'kg',
      title: 'kg'
    },
    {
      value: 'kv m',
      title: 'kv m'
    },
    {
      value: 'm',
      title: 'm'
    },
    {
      value: 'dona',
      title: 'dona'
    },
    {
      value: 'gr',
      title: 'gr'
    },
    {
      value: 'litr',
      title: 'litr'
    }
  ],
  // currency(number = Number()) {
  //   return Intl.NumberFormat("RU-ru").format(Number(number).toFixed(2));
  // },
  currency(number: number): string {
    const currency = store.getters.user?.currency;
    return new Intl.NumberFormat("ru-RU").format(Number(number.toFixed(2))) + " " + currency;
  },
  format_number(number: number): string {
    return new Intl.NumberFormat("ru-RU").format(Number(number.toFixed(2)) || 0);
  },
  tel(number: string) {
    const cleaned = number?.replace(/\D/g, ""); // faqat raqamlar qoldiriladi
    if (!cleaned) return "";

    const countryCode = store.getters.user?.country_tel_code || 998;

    switch (countryCode) {
      case 998: {
        // O'zbekiston: +998 (xx) xxx xx xx
        const operator = cleaned.slice(0, 2);
        const part1 = cleaned.slice(2, 5);
        const part2 = cleaned.slice(5, 7);
        const part3 = cleaned.slice(7, 9);
        return `+998 (${operator}) ${part1} ${part2} ${part3}`;
      }

      case 7: {
        // Rossiya/Kazakhstan: +7 (xxx) xxx-xx-xx
        const operator = cleaned.slice(0, 3);
        const part1 = cleaned.slice(3, 6);
        const part2 = cleaned.slice(6, 8);
        const part3 = cleaned.slice(8, 10);
        return `+7 (${operator}) ${part1}-${part2}-${part3}`;
      }

      case 0: {
        // Shunchaki +0 (xx) xxx xx xx formatda
        const operator = cleaned.slice(0, 2);
        const part1 = cleaned.slice(2, 5);
        const part2 = cleaned.slice(5, 7);
        const part3 = cleaned.slice(7, 9);
        return `+0 (${operator}) ${part1} ${part2} ${part3}`;
      }

      default:
        return `+${countryCode} ${cleaned}`;
    }
  },
  tel_admin(tel_code: number, number: any) {
    const cleaned = number;
    if (!cleaned) {
      return;
    }
    const code = Number(tel_code?.toString().replace(/^\+/, ""));

    switch (code) {
      case 998: {
        // O'zbekiston: +998 (xx) xxx xx xx
        const operator = cleaned.slice(0, 2);
        const part1 = cleaned.slice(2, 5);
        const part2 = cleaned.slice(5, 7);
        const part3 = cleaned.slice(7, 9);
        return `+998 (${operator}) ${part1} ${part2} ${part3}`;
      }

      case 7: {
        // Rossiya/Kazakhstan: +7 (xxx) xxx-xx-xx
        const operator = cleaned.slice(0, 3);
        const part1 = cleaned.slice(3, 6);
        const part2 = cleaned.slice(6, 8);
        const part3 = cleaned.slice(8, 10);
        return `+7 (${operator}) ${part1}-${part2}-${part3}`;
      }

      case 0: {
        // Shunchaki +0 (xx) xxx xx xx formatda
        const operator = cleaned.slice(0, 2);
        const part1 = cleaned.slice(2, 5);
        const part2 = cleaned.slice(5, 7);
        const part3 = cleaned.slice(7, 9);
        return `+0 (${operator}) ${part1} ${part2} ${part3}`;
      }

      default:
        return `+${code} ${cleaned}`;
    }

  },
  captalize(text = String()) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
  format_date(date: string) {
    if (!date) {
      return '';
    }
    return new Date(date).toLocaleString("en-GB", {
      hour12: false,
    });
  },
  getHours(date: string) {
    const newDate = new Date(date);

    const h = newDate.getHours();
    const min = newDate.getMinutes();
    return h + ':' + min;
  },
  countDays(start: string, end: string) {
    let start_date = start ? new Date(start) : new Date(),
      end_date = new Date(end),
      difference = end_date.getTime() - start_date.getTime(),
      days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
  },
  toast(icon: SweetAlertIcon = "success", title = "Amaliyot bajarildi !") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    return Toast.fire({
      icon: icon,
      title: title,
    });
  },
  getFormattedDate() {
    var mm: string | number = new Date().getMonth() + 1;
    var yy = new Date().getFullYear();
    if (mm < 10) {
      mm = '0' + mm;
    }
    return yy + "-" + mm + "-" + "01";
  },
  today() {
    return new Date().toISOString().split("T")[0]
  },
  toastError(icon: SweetAlertIcon, title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    return Toast.fire({
      icon: icon,
      title: title,
    });
  },
  removeMask(input: string): number | string {
    const digits = input.replace(/\D/g, '')
    // if (digits.startsWith('998') && digits.length >= 7) {
    //   return digits.slice(-7);
    // }
    return digits
  },
  toast2(title = "Amaliyot bajarildi !") {
    Swal.fire(title);
  },
  // formData: (object: any) =>
  //   Object.entries(object).reduce((fd, [key, val]) => {
  //     if (Array.isArray(val)) {
  //       val.forEach((v) => fd.append(key, v));
  //     } else {
  //       fd.append(key, val);
  //     }
  //     return fd;
  //   }, new FormData()),
  formData(object: Record<any, any>): FormData {
    return Object.entries(object).reduce((fd, [key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => fd.append(key, v));
      } else {
        fd.append(key, val);
      }
      return fd;
    }, new FormData());
  },

};

