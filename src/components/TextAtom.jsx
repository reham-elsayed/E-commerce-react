// "use client";
// import { textVariantColor, textVariantComponent } from "@/src/@types/enums/elements/text";
// import React, { ReactNode } from "react";
// import { useTranslation } from "react-i18next";



// const getVariantColor = (variantColor) => {
//     switch (variantColor) {
//         case "primary":
//             return "text-primary";
//         case "gradient":
//             return "bg-gradient-to-r from-gradient-FIRST to-gradient-SECOND bg-clip-text text-transparent";
//         case "white":
//             return "text-white";
//         case "gray":
//             return "text-normal-dark";
//         case "danger":
//             return "text-danger";
//         case "success":
//             return "text-[#27AE60]";
//         case "default":
//             return "text-normal-dark";
//     }
// };
// export function TextAtom({
//     children,
//     textVariantComponent = "p",
//     id,
//     textVariantColor = "default",
//     className = "",
//     textClassName = "",
//     isTranslated = true,
// }) {
//     const { t } = useTranslation();
//     const translatedChildren = typeof children === "string" && isTranslated ? t(children) : children;
//     return React.createElement(
//         textVariantComponent,
//         {
//             id,
//             className: `${getVariantColor(textVariantColor)} ${className} ${textClassName} capitalize`,
//         },
//         translatedChildren,
//     );
// }
