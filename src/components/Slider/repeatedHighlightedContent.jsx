import React from 'react';

const RepeatedHighlightedContent = () => {
    // #ffd6ec   #ffd6ec
    //  The array declaration must be initialized as an empty array
    const repeatedContent = [];

    const repetitionCount = 20;
    const baseWordGroup = ["ASDFGHJKL ASDFGHJKL ASDFGHJKL", "SDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ", "ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL", " ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL", "ASDFGHJKL ASDFGHJKL", " ASDFGHJKL ASDFGHJKL"];

    return (
        <>
            {baseWordGroup.map((word, i) => {
                const isHighlighted = i % 3 == 0
                return <React.Fragment key={i}>
                    <span
                        className={
                            // Apply styling based on whether it is highlighted
                            isHighlighted
                                ? "inline-block bg-red-intense text-pink-soft  px-3 mx-4 text-basic"
                                : "inline-block bg-transparent text-red-intense mx-4 text-basic"
                        }
                    >
                        {word}
                    </span>
                    {/* Adding a guaranteed space between word groups */}
                    <span className="inline-block px-1"> </span>
                </React.Fragment>
            }


            )}
        </>
    )
}

export default RepeatedHighlightedContent;