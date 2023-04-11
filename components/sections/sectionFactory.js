import TextImagePanel from '../sections/textImagePanel/textImagePanel';
import SingleImageBannerPanel from '../sections/singleImageBannerPanel/singleImageBannerPanel';
import ImageImagePanel from '../sections/imageImagePanel/imageImagePanel';
import QuotePanel from '../sections/quotePanel/quotePanel';
import NewsPanel from '../sections/newsPanel/newsPanel';
import NewsGrid from '../sections/newsGrid/newsGrid';
import HeroText from '../sections/heroText/heroText';


// This renders out each section as it's own custom component.
export function sectionFactory(section, news, id) {
    if (section == null) {
        return;
    }

    //console.log('panelFactory: ', section, news);
    switch(section.type) {
        // case 1:
        //     return <Header key={id} data={section}></Header>
        // case 2:
        //     return <Footer key={id} data={section}></Footer>
        case 3:
            return <TextImagePanel key={id} data={section}></TextImagePanel>
        case 4:
            return <SingleImageBannerPanel key={id} data={section}></SingleImageBannerPanel>
        case 5:
            return <ImageImagePanel key={id} data={section}></ImageImagePanel>
        case 6:
            return <QuotePanel key={id} data={section}></QuotePanel>
        case 7:
            return <NewsPanel key={id} data={section} news={news}></NewsPanel>
        case 8:
            return <HeroText key={id} data={section}></HeroText>
        case 9:
            return <NewsGrid key={id} posts={news} usePagination={section.usePagination}></NewsGrid>
        default:
            return <div key={id}>{section.title}</div>
    }
}