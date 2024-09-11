'use client';
import React, {useEffect, useState} from 'react';
import styles from './Share.module.scss';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useLocale} from "next-intl";


const Share = () => {
    const [open, SetOpen] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();

    const link = ()=>{
        return "https://www.glgconsult.com"+pathname;
    }

    const copyLink = (e) => {
        e.preventDefault();
        const linkToCopy = link()

        navigator.clipboard.writeText(linkToCopy)
            .then(()=>{
                SetOpen(false)
                console.log("Copied!");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={styles.share}>
            {!open && (
                <>
                    <div className={styles.button} onClick={() => {
                        SetOpen(true)
                    }}>
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.325 15.1583L21.675 10.3417M12.325 18.8417L21.675 23.6583M4.25 17C4.25 18.1272 4.69777 19.2082 5.4948 20.0052C6.29183 20.8022 7.37283 21.25 8.5 21.25C9.62717 21.25 10.7082 20.8022 11.5052 20.0052C12.3022 19.2082 12.75 18.1272 12.75 17C12.75 15.8728 12.3022 14.7918 11.5052 13.9948C10.7082 13.1978 9.62717 12.75 8.5 12.75C7.37283 12.75 6.29183 13.1978 5.4948 13.9948C4.69777 14.7918 4.25 15.8728 4.25 17ZM21.25 8.5C21.25 9.62717 21.6978 10.7082 22.4948 11.5052C23.2918 12.3022 24.3728 12.75 25.5 12.75C26.6272 12.75 27.7082 12.3022 28.5052 11.5052C29.3022 10.7082 29.75 9.62717 29.75 8.5C29.75 7.37283 29.3022 6.29183 28.5052 5.4948C27.7082 4.69777 26.6272 4.25 25.5 4.25C24.3728 4.25 23.2918 4.69777 22.4948 5.4948C21.6978 6.29183 21.25 7.37283 21.25 8.5ZM21.25 25.5C21.25 26.6272 21.6978 27.7082 22.4948 28.5052C23.2918 29.3022 24.3728 29.75 25.5 29.75C26.6272 29.75 27.7082 29.3022 28.5052 28.5052C29.3022 27.7082 29.75 26.6272 29.75 25.5C29.75 24.3728 29.3022 23.2918 28.5052 22.4948C27.7082 21.6978 26.6272 21.25 25.5 21.25C24.3728 21.25 23.2918 21.6978 22.4948 22.4948C21.6978 23.2918 21.25 24.3728 21.25 25.5Z"
                                stroke="#343434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className={styles.text}>{locale === 'ru' ? "Поделиться" : "Share"}</span>
                </>
            )
            }
            {open && (
                <>
                    <div className={styles.closeButton} onClick={()=>{SetOpen(false)}}>
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M17.2806 31.7173L31.7193 17.2827M17.2806 17.2827L31.7193 31.7173"
                                      stroke="#343434" strokeWidth="3.5" strokeLinecap="round"/>
                            </g>
                        </svg>
                    </div>
                   <div className={styles.shareBlock}>
                       <Link className={styles.item} href={`https://vk.com/share.php?url=${link()}`}>
                           <svg width="45" height="45" viewBox="0 0 45 45" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                               <g opacity="0.4">
                                   <path fillRule="evenodd" clipRule="evenodd"
                                         d="M43.8844 31.6219C42.8644 29.5677 41.5203 27.6912 39.9037 26.0644C39.3631 25.4534 38.7969 24.8653 38.2069 24.3019L38.1356 24.2325C37.9165 24.0197 37.7003 23.8041 37.4869 23.5856C39.6967 20.5127 41.5877 17.2225 43.1306 13.7662L43.1925 13.6275L43.2356 13.4812C43.44 12.8006 43.6725 11.5069 42.8475 10.3369C41.9925 9.12937 40.6256 8.91187 39.7087 8.91187H35.4956C34.6135 8.87167 33.7412 9.11156 33.0036 9.5972C32.2661 10.0828 31.701 10.7894 31.3894 11.6156C30.4827 13.7749 29.3474 15.831 28.0031 17.7487V12.8119C28.0031 12.1744 27.9431 11.1056 27.2588 10.2056C26.4412 9.12562 25.2581 8.91187 24.4369 8.91187H17.7506C16.8781 8.8918 16.0314 9.20805 15.3856 9.79514C14.7399 10.3822 14.3447 11.1952 14.2819 12.0656L14.2762 12.15V12.2344C14.2762 13.1437 14.6363 13.815 14.925 14.2369C15.0544 14.4262 15.1912 14.5987 15.2794 14.7075L15.2981 14.7319C15.3919 14.8481 15.4537 14.925 15.5156 15.0112C15.6806 15.2325 15.915 15.5775 15.9825 16.4662V19.2281C14.6403 16.9806 13.5398 14.5973 12.6994 12.1181L12.6844 12.0769L12.6694 12.0375C12.4406 11.4394 12.075 10.5694 11.3419 9.90562C10.4869 9.1275 9.47437 8.91187 8.55375 8.91187H4.27875C3.34688 8.91187 2.22375 9.12937 1.38563 10.0125C0.5625 10.8825 0.46875 11.925 0.46875 12.4762V12.7275L0.52125 12.9712C1.70494 18.4664 4.14419 23.6132 7.64813 28.0087C9.25008 30.535 11.4249 32.648 13.9962 34.1765C16.5675 35.705 19.4629 36.606 22.4475 36.8062L22.5244 36.8119H22.6031C23.9644 36.8119 25.3838 36.6937 26.4506 35.9831C27.8888 35.0231 28.0031 33.5512 28.0031 32.8162V30.6825C28.3725 30.9825 28.83 31.3837 29.3906 31.9237C30.0694 32.6025 30.6094 33.1912 31.0725 33.705L31.32 33.9787C31.68 34.38 32.0344 34.7756 32.3569 35.1C32.7619 35.5069 33.2625 35.955 33.8887 36.2869C34.5694 36.645 35.2837 36.8081 36.0413 36.8081H40.3181C41.22 36.8081 42.5119 36.5944 43.4213 35.5406C44.4113 34.3931 44.3363 32.985 44.025 31.9744L43.9688 31.7925L43.8844 31.6219ZM33.1594 31.8206C32.5783 31.171 31.9799 30.5371 31.365 29.9194L31.3594 29.9137C28.815 27.4612 27.6281 27.0356 26.7881 27.0356C26.34 27.0356 25.8469 27.0844 25.5263 27.4856C25.3819 27.677 25.2872 27.9012 25.2506 28.1381C25.2054 28.4132 25.1853 28.6919 25.1906 28.9706V32.8162C25.1906 33.2944 25.1119 33.495 24.8906 33.6412C24.5962 33.8381 23.9681 33.9975 22.62 33.9975C20.0591 33.8232 17.5762 33.0437 15.3753 31.7229C13.1744 30.4021 11.3185 28.5778 9.96 26.4L9.945 26.3756L9.92625 26.3531C6.66209 22.2903 4.38721 17.5242 3.28125 12.4312C3.28875 12.1875 3.34125 12.0394 3.4275 11.9494C3.51562 11.8556 3.73125 11.7244 4.27875 11.7244H8.55375C9.02812 11.7244 9.27562 11.8294 9.45375 11.9887C9.6525 12.1725 9.82875 12.4819 10.0387 13.0331C11.0887 16.1194 12.5063 19.0069 13.8506 21.1275C14.5219 22.1887 15.1819 23.0719 15.7781 23.6962C16.0763 24.0075 16.3669 24.2662 16.6462 24.45C16.9144 24.6262 17.22 24.7669 17.535 24.7669C17.7 24.7669 17.8931 24.7481 18.0788 24.6675C18.2792 24.579 18.4442 24.4258 18.5475 24.2325C18.7406 23.88 18.795 23.3606 18.795 22.68V16.3556C18.6956 14.8219 18.2325 13.9575 17.7825 13.3444C17.6914 13.2217 17.5976 13.1011 17.5012 12.9825L17.4769 12.9525C17.3969 12.8554 17.3206 12.7553 17.2481 12.6525C17.1558 12.5378 17.1003 12.398 17.0888 12.2512C17.1035 12.1023 17.1746 11.9645 17.2875 11.8662C17.4004 11.7679 17.5467 11.7165 17.6962 11.7225H24.4369C24.8231 11.7225 24.9525 11.8162 25.0181 11.9044C25.1119 12.0262 25.1906 12.2794 25.1906 12.8119V21.3019C25.1906 22.3106 25.6556 22.9931 26.3306 22.9931C27.1069 22.9931 27.6675 22.5225 28.6462 21.5437L28.6631 21.525L28.6781 21.5081C30.8737 18.8312 32.6675 15.8486 34.0031 12.6544L34.0106 12.6319C34.111 12.3497 34.3009 12.108 34.5514 11.9438C34.802 11.7796 35.0993 11.7019 35.3981 11.7225H39.7106C40.2956 11.7225 40.4869 11.8725 40.5506 11.9606C40.6163 12.0544 40.6631 12.255 40.5506 12.6487C39.0105 16.0919 37.1065 19.3605 34.8713 22.3987L34.8563 22.4212C34.6406 22.7531 34.4025 23.1206 34.3688 23.5406C34.3312 23.9944 34.5262 24.405 34.8694 24.8475C35.1188 25.215 35.6344 25.7194 36.1575 26.2312L36.2062 26.28C36.7537 26.8162 37.3481 27.3975 37.8244 27.96L37.8375 27.9731L37.8506 27.9881C39.2708 29.4047 40.4517 31.0422 41.3475 32.8369C41.49 33.3244 41.4037 33.5756 41.2912 33.705C41.1619 33.855 40.8713 33.9956 40.32 33.9956H36.0413C35.7496 34.0027 35.4611 33.9349 35.2031 33.7987C34.887 33.6149 34.6001 33.3848 34.3519 33.1162C34.0837 32.8481 33.7931 32.5237 33.4369 32.1281L33.1613 31.8206H33.1594Z"
                                         fill="#343434"/>
                               </g>
                           </svg>
                       </Link>
                       <Link href={`https://t.me/share/url?url=${link()}`} className={styles.item}>
                           <svg width="45" height="45" viewBox="0 0 45 45" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                               <g opacity="0.4">
                                   <path
                                       d="M41.6391 4.60369C41.4212 4.41555 41.1561 4.29042 40.8724 4.24179C40.5886 4.19316 40.297 4.22287 40.0289 4.32772L4.40508 18.2689C3.90021 18.4652 3.47278 18.8203 3.18713 19.2805C2.90149 19.7408 2.7731 20.2814 2.82128 20.8209C2.86947 21.3605 3.09162 21.8698 3.4543 22.2722C3.81698 22.6745 4.30056 22.9482 4.83223 23.0519L14.0625 24.8642V35.1562C14.0607 35.7168 14.2273 36.2651 14.5407 36.7299C14.8541 37.1947 15.2999 37.5546 15.8203 37.7631C16.3399 37.9752 16.9113 38.0262 17.4603 37.9092C18.0092 37.7923 18.5102 37.5129 18.8982 37.1074L23.349 32.4914L30.4102 38.6719C30.9196 39.1237 31.5766 39.3738 32.2576 39.375C32.556 39.3747 32.8526 39.3279 33.1365 39.2361C33.6005 39.0889 34.0178 38.8227 34.3469 38.464C34.6759 38.1053 34.9053 37.6667 35.0121 37.1918L42.1471 6.15233C42.2109 5.87239 42.1973 5.58037 42.1078 5.30756C42.0183 5.03474 41.8563 4.79143 41.6391 4.60369ZM30.8918 10.9318L15.1436 22.2099L6.42481 20.4996L30.8918 10.9318ZM16.875 35.1562V26.8101L21.2326 30.6316L16.875 35.1562ZM32.2611 36.5625L17.7275 23.8183L38.6455 8.82596L32.2611 36.5625Z"
                                       fill="#343434"/>
                               </g>
                           </svg>
                       </Link>
                       <Link href={`viber://forward?text=${link()}`} className={styles.item}>
                           <svg width="45" height="45" viewBox="0 0 45 45" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                               <g opacity="0.4">
                                   <path
                                       d="M14.9344 11.6288C14.5859 11.578 14.2306 11.6482 13.9275 11.8275H13.9012C13.1981 12.24 12.5644 12.7594 12.0244 13.3706C11.5744 13.89 11.3306 14.415 11.2669 14.9213C11.2294 15.2213 11.2556 15.525 11.3437 15.8119L11.3775 15.8306C11.8837 17.3175 12.5437 18.7481 13.35 20.0944C14.3896 21.9853 15.6689 23.7341 17.1562 25.2975L17.2012 25.3612L17.2725 25.4137L17.3156 25.4644L17.3681 25.5094C18.937 27.0012 20.6899 28.2866 22.5844 29.3344C24.75 30.5138 26.0644 31.0706 26.8537 31.3031V31.3144C27.0844 31.3856 27.2944 31.4175 27.5062 31.4175C28.1785 31.3678 28.8148 31.0946 29.3137 30.6412C29.9231 30.1012 30.4387 29.4656 30.84 28.7588V28.7456C31.2169 28.0331 31.0894 27.3619 30.5456 26.9062C29.4534 25.9519 28.2724 25.1043 27.0187 24.375C26.1787 23.9194 25.3256 24.195 24.9806 24.6562L24.2437 25.5863C23.865 26.0475 23.1787 25.9837 23.1787 25.9837L23.16 25.995C18.0394 24.6881 16.6725 19.5038 16.6725 19.5038C16.6725 19.5038 16.6087 18.7987 17.0831 18.4387L18.0056 17.6962C18.4481 17.3362 18.7556 16.485 18.2812 15.645C17.5568 14.3902 16.7108 13.2095 15.7556 12.12C15.5473 11.8636 15.2551 11.6889 14.9306 11.6269L14.9344 11.6288ZM23.5875 9.375C23.3389 9.375 23.1004 9.47377 22.9246 9.64959C22.7488 9.8254 22.65 10.0639 22.65 10.3125C22.65 10.5611 22.7488 10.7996 22.9246 10.9754C23.1004 11.1512 23.3389 11.25 23.5875 11.25C25.9575 11.25 27.9262 12.0244 29.4844 13.5094C30.285 14.3212 30.9094 15.2831 31.3181 16.3369C31.7287 17.3925 31.9162 18.5194 31.8675 19.6481C31.857 19.8968 31.9458 20.1394 32.1142 20.3226C32.2827 20.5058 32.517 20.6146 32.7656 20.625C33.0143 20.6354 33.2569 20.5467 33.4401 20.3783C33.6233 20.2098 33.732 19.9755 33.7425 19.7269C33.8007 18.3384 33.5702 16.953 33.0656 15.6581C32.5589 14.3571 31.7905 13.174 30.8081 12.1819L30.7894 12.1631C28.8562 10.3162 26.4112 9.375 23.5875 9.375Z"
                                       fill="#343434"/>
                                   <path
                                       d="M23.5219 12.4575C23.2732 12.4575 23.0348 12.5563 22.859 12.7321C22.6832 12.9079 22.5844 13.1464 22.5844 13.395C22.5844 13.6436 22.6832 13.8821 22.859 14.0579C23.0348 14.2337 23.2732 14.3325 23.5219 14.3325H23.5538C25.2638 14.4544 26.5088 15.0244 27.3806 15.96C28.275 16.9238 28.7381 18.1219 28.7025 19.6031C28.6968 19.8518 28.7901 20.0925 28.9618 20.2724C29.1336 20.4522 29.3698 20.5565 29.6184 20.5622C29.8671 20.5679 30.1078 20.4746 30.2877 20.3028C30.4675 20.1311 30.5718 19.8949 30.5775 19.6463C30.6225 17.7019 29.9963 16.0238 28.755 14.685V14.6813C27.4856 13.32 25.7438 12.6 23.6475 12.4594L23.6156 12.4556L23.5219 12.4575Z"
                                       fill="#343434"/>
                                   <path
                                       d="M23.4862 15.5981C23.3608 15.587 23.2344 15.6014 23.1146 15.6402C22.9948 15.6791 22.884 15.7417 22.7889 15.8243C22.6939 15.9069 22.6164 16.0078 22.5612 16.121C22.506 16.2342 22.4742 16.3574 22.4676 16.4832C22.4611 16.609 22.4799 16.7348 22.5231 16.8531C22.5662 16.9715 22.6327 17.0799 22.7187 17.1719C22.8047 17.264 22.9083 17.3377 23.0235 17.3888C23.1386 17.4399 23.2628 17.4673 23.3887 17.4694C24.1725 17.5106 24.6731 17.7469 24.9881 18.0637C25.305 18.3825 25.5412 18.8944 25.5844 19.695C25.5867 19.8208 25.6143 19.9448 25.6656 20.0598C25.7169 20.1747 25.7909 20.2781 25.883 20.3638C25.9751 20.4495 26.0835 20.5158 26.2018 20.5588C26.3201 20.6017 26.4458 20.6204 26.5714 20.6137C26.6971 20.6071 26.8201 20.5752 26.9332 20.5199C27.0462 20.4647 27.147 20.3873 27.2295 20.2923C27.312 20.1973 27.3746 20.0866 27.4134 19.9669C27.4523 19.8472 27.4666 19.721 27.4556 19.5956C27.3956 18.4706 27.0431 17.4769 26.3212 16.7456C25.5956 16.0144 24.6075 15.6581 23.4862 15.5981Z"
                                       fill="#343434"/>
                                   <path fillRule="evenodd" clipRule="evenodd"
                                         d="M13.2506 4.46999C19.217 3.13631 25.4043 3.13631 31.3706 4.46999L32.0063 4.61061C33.7504 5.00052 35.3522 5.86635 36.6339 7.1119C37.9155 8.35746 38.8267 9.93396 39.2663 11.6662C40.7807 17.6342 40.7807 23.8858 39.2663 29.8537C38.8267 31.586 37.9155 33.1625 36.6339 34.4081C35.3522 35.6536 33.7504 36.5195 32.0063 36.9094L31.3688 37.05C27.6319 37.8856 23.7975 38.2005 19.9744 37.9856L15 42.4369C14.8125 42.6048 14.5833 42.7193 14.3364 42.7684C14.0895 42.8175 13.834 42.7995 13.5965 42.7161C13.3589 42.6328 13.1481 42.4873 12.9861 42.2947C12.824 42.1021 12.7165 41.8695 12.675 41.6212L11.8519 36.705C10.2735 36.2139 8.8474 35.3261 7.70995 34.1266C6.5725 32.9271 5.76169 31.456 5.35501 29.8537C3.84049 23.8858 3.84049 17.6341 5.35501 11.6662C5.79455 9.93396 6.70575 8.35746 7.98739 7.1119C9.26902 5.86635 10.8709 5.00052 12.615 4.61061L13.2506 4.46999ZM30.7575 7.21311C25.1949 5.96962 19.4264 5.96962 13.8638 7.21311L13.2263 7.35561C11.9901 7.63247 10.8549 8.24653 9.94665 9.12961C9.03842 10.0127 8.39272 11.1302 8.08126 12.3581C6.68197 17.872 6.68197 23.648 8.08126 29.1619C8.39287 30.39 9.03885 31.5077 9.94743 32.3908C10.856 33.2739 11.9916 33.8878 13.2281 34.1644L13.3969 34.2019C13.6699 34.2629 13.9184 34.404 14.1108 34.6071C14.3032 34.8101 14.4307 35.066 14.4769 35.3419L15.0281 38.6381L18.5381 35.4975C18.6783 35.3717 18.8423 35.2753 19.0204 35.2142C19.1985 35.153 19.3871 35.1282 19.575 35.1412C23.3232 35.4071 27.0902 35.1261 30.7575 34.3069L31.3931 34.1644C32.6296 33.8878 33.7653 33.2739 34.6738 32.3908C35.5824 31.5077 36.2284 30.39 36.54 29.1619C37.9388 23.6494 37.9388 17.8725 36.54 12.3581C36.2284 11.13 35.5824 10.0123 34.6738 9.12918C33.7653 8.24608 32.6296 7.63216 31.3931 7.35561L30.7575 7.21311Z"
                                         fill="#343434"/>
                               </g>
                           </svg>
                       </Link>
                       <Link href={`https://api.whatsapp.com/send?text=${link()}`} className={styles.item}>

                           <svg width="45" height="45" viewBox="0 0 45 45" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                               <g opacity="0.4">
                                   <path
                                       d="M35.7188 9.20624C33.9998 7.46985 31.9522 6.09312 29.6956 5.15634C27.4389 4.21955 25.0183 3.74148 22.575 3.74999C12.3375 3.74999 3.99375 12.0937 3.99375 22.3312C3.99375 25.6125 4.85625 28.8 6.46875 31.6125L3.84375 41.25L13.6875 38.6625C16.4062 40.1437 19.4625 40.9312 22.575 40.9312C32.8125 40.9312 41.1563 32.5875 41.1563 22.35C41.1563 17.3812 39.225 12.7125 35.7188 9.20624ZM22.575 37.7812C19.8 37.7812 17.0813 37.0312 14.7 35.625L14.1375 35.2875L8.2875 36.825L9.84375 31.125L9.46875 30.5437C7.92702 28.0818 7.10839 25.2361 7.10625 22.3312C7.10625 13.8187 14.0437 6.88124 22.5562 6.88124C26.6812 6.88124 30.5625 8.49374 33.4688 11.4187C34.9078 12.8512 36.0482 14.555 36.8239 16.4314C37.5995 18.3078 37.9951 20.3196 37.9875 22.35C38.025 30.8625 31.0875 37.7812 22.575 37.7812ZM31.05 26.2312C30.5812 26.0062 28.2937 24.8812 27.8812 24.7125C27.45 24.5625 27.15 24.4875 26.8313 24.9375C26.5125 25.4062 25.6312 26.4562 25.3687 26.7562C25.1062 27.075 24.825 27.1125 24.3562 26.8687C23.8875 26.6437 22.3875 26.1375 20.625 24.5625C19.2375 23.325 18.3187 21.8062 18.0375 21.3375C17.775 20.8687 18 20.625 18.2437 20.3812C18.45 20.175 18.7125 19.8375 18.9375 19.575C19.1625 19.3125 19.2563 19.1062 19.4062 18.8062C19.5563 18.4875 19.4812 18.225 19.3687 18C19.2562 17.775 18.3187 15.4875 17.9437 14.55C17.5687 13.65 17.175 13.7625 16.8938 13.7437H15.9937C15.675 13.7437 15.1875 13.8562 14.7562 14.325C14.3437 14.7937 13.1438 15.9187 13.1438 18.2062C13.1438 20.4937 14.8125 22.7062 15.0375 23.0062C15.2625 23.325 18.3187 28.0125 22.9688 30.0187C24.075 30.5062 24.9375 30.7875 25.6125 30.9937C26.7188 31.35 27.7313 31.2937 28.5375 31.1812C29.4375 31.05 31.2937 30.0562 31.6687 28.9687C32.0625 27.8812 32.0625 26.9625 31.9313 26.7562C31.8 26.55 31.5187 26.4562 31.05 26.2312Z"
                                       fill="#343434"/>
                               </g>
                           </svg>

                       </Link>
                       <Link href={'#'} onClick={copyLink} aria-value={''} className={styles.item}>


                           <svg width="45" height="45" viewBox="0 0 45 45" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                               <g opacity="0.4">
                                   <path
                                       d="M16.875 28.125L28.125 16.875M20.625 11.25L21.4931 10.245C23.2515 8.48689 25.6363 7.49927 28.1229 7.49945C30.6094 7.49963 32.9941 8.48758 34.7522 10.246C36.5103 12.0043 37.4979 14.3891 37.4978 16.8757C37.4976 19.3622 36.5096 21.7469 34.7513 23.505L33.75 24.375M24.375 33.75L23.6306 34.7513C21.8517 36.5104 19.4509 37.497 16.9491 37.497C14.4473 37.497 12.0464 36.5104 10.2675 34.7513C9.39068 33.8843 8.69456 32.8519 8.21946 31.714C7.74437 30.5761 7.49974 29.3553 7.49974 28.1222C7.49974 26.8891 7.74437 25.6683 8.21946 24.5304C8.69456 23.3925 9.39068 22.3601 10.2675 21.4931L11.25 20.625"
                                       stroke="#343434" strokeWidth="4" strokeLinecap="round"
                                       strokeLinejoin="round"/>
                               </g>
                           </svg>


                       </Link>

                   </div>
                </>
            )}

        </div>
    );
};


export default Share;