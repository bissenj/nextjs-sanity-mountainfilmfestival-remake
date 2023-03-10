/* eslint-disable simple-import-sort/imports */
import Footer from './footer';
import Header from './header';
import TextImagePanel from './sections/textImagePanel/textImagePanel';
import SingleImageBannerPanel from './sections/singleImageBannerPanel/singleImageBannerPanel';
import Sidebar from './sidebar/sidebar';
import Sitemenu from './menu/menu';

export default function Page({ data }) {
    console.log('Page: ', data);

    // This renders out each section as it's own custom component.
    function panelFactory(section) {
        switch(section.type) {
            case 1:
                return <Header key={section.id} data={section}></Header>
            case 2:
                return <Footer key={section.id} data={section}></Footer>
            case 3:
                return <TextImagePanel key={section.id} data={section}></TextImagePanel>
            default:
                return <div key={section.id}>{section.title}</div>
        }
    }

    return (
        <>
            <div className='page'>
                
                {/* PUT SIDE MENU HERE */}
                {/* <div className='side-bar'></div> */}
                <Sitemenu></Sitemenu>
                <Sidebar></Sidebar>

                <SingleImageBannerPanel></SingleImageBannerPanel>

                {/* Sections go here */}
                {data.sections.map((s) => (
                    panelFactory(s)                
                ))}

                <div style={{backgroundColor: '#000', minHeight:'70vh'}}></div>
            </div>
            <div style={{backgroundColor: '#fff', minHeight:'10vh'}}></div>
            <div style={{backgroundColor: '#000', minHeight:'40vh'}}></div>
        
        </>
    );
}