import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import store from "../store";

interface User {
  access_token?: string;
  role?: string; // Bu qatorni qo'shing
  // boshqa fieldlar...
}
const token = (): string | undefined => {
  return store.state.user?.access_token;
};

if (window.location.pathname === '/' && store?.state?.user?.role === 'admin') {
  window.location.href = "/branches";
}

const auth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
  if (!token() && to.path !== '/') {
    next({ path: "/sign-in" });
    return;
  }
  next();
  return;
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("../views/NotFound/NotFound.vue"),
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("../views/SignIn/SignIn.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/SignIn/Login.vue"),
  },
  {
    path: "/register",
    name: "Registiratsiya",
    component: () => import("../views/SignIn/Register.vue"),
  },
  {
    path: "/notifications",
    name: "Xabarnomalar",
    beforeEnter: auth,
    component: () => import("../views/Notification/Notifications.vue"),
  },
  {
    path: "/statistic",
    name: "Hisobotlar",
    beforeEnter: auth,
    component: () => import("../views/Statistic/Statistic.vue"),
  },
  {
    path: "/all-statistic",
    name: "Umumiy hisobotlar",
    beforeEnter: auth,
    component: () => import("../views/Statistic/StatisticAdmin.vue"),
  },
  {
    path: "/take_money",
    name: "pul olish",
    beforeEnter: auth,
    component: () => import("../views/Statistic/TakeMoney.vue"),
  },
  {
    path: "/branches",
    name: "Do'konlar",
    beforeEnter: auth,
    component: () => import("../views/Branch/Branches.vue"),
  },
  {
    path: "/transfer-products",
    name: "Mahsulot o'tkazish",
    beforeEnter: auth,
    component: () => import("../views/Branch/Transfer.vue"),
  },
  {
    path: "/order",
    name: "Savdo",
    beforeEnter: auth,
    component: () => import("../views/Order/Order.vue"),
  },
  {
    path: "/order-offline",
    name: "Buyurtma Ofline",
    beforeEnter: auth,
    component: () => import("../views/Order/OrderOfline.vue"),
  },
  {
    path: "/orders",
    name: "Buyurtmalar",
    beforeEnter: auth,
    component: () => import("../views/Order/AllOrders.vue"),
  },
  {
    path: "/users",
    name: "Hodimlar ma'lumoti",
    beforeEnter: auth,
    component: () => import("../views/Users/Users.vue"),
  },
  {
    path: "/user",
    name: "Hodim",
    beforeEnter: auth,
    component: () => import("../views/Users/User.vue"),
  },
  {
    path: "/warehousemen",
    name: "omborchilar",
    beforeEnter: auth,
    component: () => import("../views/Users/Warehouseman.vue"),
  },
  {
    path: "/user-bonus",
    name: "jarima",
    beforeEnter: auth,
    component: () => import("../views/Users/UserJarima.vue"),
  },
  {
    path: "/main-users",
    name: "Hodimlar",
    beforeEnter: auth,
    component: () => import("../views/Users/MainUsers.vue"),
    children: [
      {
        path: "/user",
        name: "Hodim",
        beforeEnter: auth,
        component: () => import("../views/Users/User.vue"),
      },
    ],
  },
  {
    path: "/customers",
    name: "Mijozlar",
    beforeEnter: auth,
    component: () => import("../views/Customers/Customers.vue"),
    children: [
      {
        path: "/customer",
        name: "Mijoz",
        beforeEnter: auth,
        component: () => import("../views/Customers/Customer.vue"),
      },
    ],
  },
  {
    path: "/expense",
    name: "Chiqim",
    beforeEnter: auth,
    component: () => import("../views/Expense/Expense.vue"),
  },
  {
    path: "/fixed-expense-history",
    name: "Doimiy Chiqim",
    beforeEnter: auth,
    component: () => import("../views/Expense/FixedHistory.vue"),
  },
  {
    path: "/loans",
    name: "Nasiyalar",
    beforeEnter: auth,
    component: () => import("../views/Loan/Loans.vue"),
  },
  {
    path: "/loan",
    name: "Nasiya",
    beforeEnter: auth,
    component: () => import("../views/Loan/Loan.vue"),
  },
  {
    path: "/main-supply",
    name: "Ta'minotlar",
    beforeEnter: auth,
    component: () => import("../views/Supply/MainSupply.vue"),
  },
  {
    path: "/suppliers",
    name: "Ta'minotchilar",
    beforeEnter: auth,
    component: () => import("../views/Suppliers/Suppliers.vue"),
  },
  {
    path: "/supplier",
    name: "Ta'minotchi",
    beforeEnter: auth,
    component: () => import("../views/Suppliers/Supplier.vue"),
  },
  {
    path: "/supply-group",
    name: "Ta'minot guruhlar",
    beforeEnter: auth,
    component: () => import("../views/Suppliers/SupplyGroup.vue"),
  },
  {
    path: "/parties",
    name: "Ta'minot partiyalari",
    beforeEnter: auth,
    component: () => import("../views/Supply/Parties.vue"),
  },
  {
    path: "/party",
    name: "Ta'minot partiya",
    beforeEnter: auth,
    component: () => import("../views/Supply/Party.vue"),
  },
  {
    path: "/content-product",
    name: "Mahsulot tarkibi",
    beforeEnter: auth,
    component: () => import("../views/Product/ContentProduct.vue")
  },
  {
    path: "/ready-product-history",
    name: "Tayyor Mahsulot Tarixi",
    beforeEnter: auth,
    component: () => import("../views/Product/ReadyProductHistory.vue")
  },
  {
    path: "/komplekt_product",
    name: "Mahsulot Tarkibi",
    beforeEnter: auth,
    component: () => import("../views/Product/KomplektProduct.vue")
  },
  {
    path: "/products",
    name: "Mahsulotlar ",
    beforeEnter: auth,
    component: () => import("../views/Product/Products.vue"),
  },
  {
    path: "/necessary-products",
    name: "Kerakli Mahsulotlar",
    beforeEnter: auth,
    component: () => import("../views/NecessaryProducts/NecessaryProducts.vue"),
  },
  {
    path: "/main-products",
    name: "Mahsulotlar",
    beforeEnter: auth,
    component: () => import("../views/Product/MainProducts.vue"),
  },
  {
    path: "/product",
    name: "Mahsulot",
    beforeEnter: auth,
    component: () => import("../views/Product/Product.vue"),
  },
  {
    path: "/revision",
    name: "Mahsulotlar qoldig'i",
    beforeEnter: auth,
    component: () => import("../views/Revision/Revision.vue"),
  },
  {
    path: "/return",
    name: "Mahsulot vozvrati",
    beforeEnter: auth,
    component: () => import("../views/Return/Return.vue"),
  },
  {
    path: "/return-trade",
    name: "Mahsulot vozvrat",
    beforeEnter: auth,
    component: () => import("../views/Return/ReturnTrade.vue"),
  },
  {
    path: "/return-histories",
    name: "Mahsulot vozvrati tarix",
    beforeEnter: auth,
    component: () => import("../views/Return/ReturnHistory.vue"),
  },
  {
    path: "/return-item",
    name: "vozvrati tarix",
    beforeEnter: auth,
    component: () => import("../views/Return/ReturnItems.vue"),
  },
  {
    path: "/cell",
    name: "Polka",
    beforeEnter: auth,
    component: () => import("../views/Cell/Cell.vue"),
  },
  {
    path: "/start_branch",
    name: "Boshlash",
    beforeEnter: auth,
    component: () => import("../views/Branch/Start.vue"),
  },
  {
    path: "/about_program",
    name: "Dastur haqida",
    beforeEnter: auth,
    component: () => import("../views/AboutProgramm/AboutProgram.vue"),
  },
  {
    path: "/sms_shablon",
    name: "SMS shablon",
    beforeEnter: auth,
    component: () => import("../views/SmsShablon/SmsShablon.vue"),
  },
  {
    path: "/attandance",
    name: "Davomat",
    beforeEnter: auth,
    component: () => import("../views/Attandance/Attandance.vue"),
  },
  {
    path: "/user-attandance",
    name: "Hodim Davomat",
    beforeEnter: auth,
    component: () => import("../views/Attandance/UserAttand.vue"),
  },
  {
    path: "/kassa",
    name: "Kassa",
    beforeEnter: auth,
    component: () => import("../views/CashReg/CashReg.vue"),
  },
  {
    path: "/kassa-history",
    name: "Kassa tarix",
    beforeEnter: auth,
    component: () => import("../views/CashReg/CashHistory.vue"),
  },
  {
    path: "/Took-money",
    name: "Pul olish",
    beforeEnter: auth,
    component: () => import("../views/CashReg/TakedMoney.vue"),
  },
  {
    path: "/warehouses",
    name: "Omborlar",
    beforeEnter: auth,
    component: () => import("../views/Warehouse/Warehouses.vue"),
  },
  {
    path: "/warehouse",
    name: "Ombor",
    beforeEnter: auth,
    component: () => import("../views/Warehouse/Warehouse.vue"),
  },
  {
    path: "/warehouse-products",
    name: "Ombor mahsulotlari",
    beforeEnter: auth,
    component: () => import("../views/Warehouse/WrProducts.vue"),
  },
  {
    path: "/branch-warehouse",
    name: "Filial ombor",
    beforeEnter: auth,
    component: () => import("../views/Warehouse/BranchWarehouse.vue"),
  },
  {
    path: "/kassa-transfer",
    name: "Kassa o'tkazma",
    beforeEnter: auth,
    component: () => import("../views/CashReg/CashTrans.vue"),
  },
  {
    path: "/discount_products",
    name: "Chegirmadagi mahsulotlar",
    beforeEnter: auth,
    component: () => import("../views/Setting/DiscountProduct.vue"),
  },
  {
    path: "/setting",
    name: "Sozlamalar",
    beforeEnter: auth,
    component: () => import("../views/Setting/Setting.vue"),
  },
  {
    path: "/ticket",
    name: "Ticketlar",
    beforeEnter: auth,
    component: () => import("../views/Ticket/Ticket.vue"),
  },
  {
    path: "/ticket-item",
    name: "Ticket",
    beforeEnter: auth,
    component: () => import("../views/Ticket/TicketItem.vue"),
  },
  {
    path: "/start-page",
    name: "Start Sahifa",
    beforeEnter: auth,
    component: () => import("../views/StartPage/start-page.vue"),
  },
  {
    path: "/start",
    name: "Start",
    beforeEnter: auth,
    component: () => import("../views/StartPage/start.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.path === "/") {
    next("/sign-in");
  } else {
    next();
  }
});

export default router;