import Footer from './footer';
import Header from './header';
import TextImagePanel from './sections/textImagePanel';

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
        <div className='page'>
            <h1>This is a page</h1>

            {/* Sections go here */}
            {data.sections.map((s) => (
                panelFactory(s)                
            ))}

        </div>
    );
}