
export default function BoardGrid() {

    

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Board Grid Component</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">Item 1</div>
                <div className="bg-white p-4 rounded shadow">Item 2</div>
                <div className="bg-white p-4 rounded shadow">Item 3</div>
                <div className="bg-white p-4 rounded shadow">Item 4</div>
            </div>
        </div>
    );
}    