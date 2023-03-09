

export default function Page({ data }) {

    console.log('Page: ', data);

    return (
        <div className='page'>
            <h1>This is a page</h1>

            {/* Sections go here */}
            {data.sections.map((s) => (
                <div key={s.type}>{s.title}</div>
            ))}

        </div>
    );
}