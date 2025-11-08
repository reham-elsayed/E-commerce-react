import React from 'react';

const RepeatedHighlightedContent = () => {

    const baseWordGroup =
        [
            "Discover unbeatable deals on everyday essentials and trending gadgets.",
            "Shop fashion, tech, and home items curated just for you.",
            "SALE", // highlight word

            "Upgrade your lifestyle with premium products at budget-friendly prices.",
            "Find exclusive offers before they’re gone.",
            "WOW", // highlight word

            "Explore new arrivals in electronics, beauty, and more.",
            "Get free delivery on your favorite brands today.",
            "LIMITED", // highlight word

            "Transform your space with modern home décor and appliances.",
            "Save more with bundle discounts and flash offers.",
            "HOT", // highlight word

            "Shop smarter with personalized recommendations and lightning-fast checkout.",
            "Experience the future of online shopping now.",
            "GO", // highlight word
        ];
    return (
        <>
            {baseWordGroup.map((word, i) => {
                const isHighlighted = (i + 1) % 3 === 0
                return <React.Fragment key={i}>
                    <span
                        className={
                            // Apply styling based on whether it is highlighted
                            isHighlighted
                                ? "inline-block bg-red-intense text-pink-soft  px-3  text-lg rounded-md"
                                : "inline-block bg-transparent text-red-intense mx-4 text-basic"
                        }
                    >
                        {word}
                    </span>
                    {/* Adding a guaranteed space between word groups */}
                    {/* <span className="inline-block px-1"> </span> */}
                </React.Fragment>
            }


            )}
        </>
    )
}

export default RepeatedHighlightedContent;