import style from './quotePanel.module.css';

export default function QuotePanel({data}) {

    console.log('Quote Panel: ', data);

    // const quoteText = '"Telluride Mountainfilm has always held a special place in my heart. The first films I ever made played at this festival. It is a crucible for storytelling talent from the past, present and, most importantly, the future. Its importance among our tribe cannot be overstated. The film festival has been a gathering place for our tribe long before I was even a part of the climbing and outdoor community. I met many of my mentors at Mountainfilm. All of them have had a major impact on my life. This gathering place showcases the beauty of what we do and fosters and inspires talent for future generations of storytellers in the outdoor industry and beyond."';
    // const quoteAuthor = 'Jimmy Chin, Adventurer, Alpinist, Photographer, Director';

    return (
        <div className={`${style['quote-container']}`}>
            <figure>
                <blockquote className={`${style['quote-text']}`}>
                    {data?.quote}
                </blockquote>
                <figcaption className={`${style['quote-author']}`}>
                    {data?.author}
                </figcaption>
            </figure>
        </div>
    );
}