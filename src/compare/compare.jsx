import React from 'react';

export function Compare() {
    const [entries, setEntries] = React.useState([]);

    React.useEffect(() => {
        const userEmail = localStorage.getItem('username');

        fetch(`/api/entries?email=${encodeURIComponent(userEmail)}`)
            .then((response) => response.json())
            .then((entries) => {
                setEntries(entries);
                localStorage.setItem('previousEntries', JSON.stringify(entries));
            })
            .catch(() => {
                const previousEntries = localStorage.getItem('previousEntries');
                if (previousEntries) {
                    setEntries(JSON.parse(previousEntries));
                }
            });
    }, []);

    const sortedEntries = [...entries].sort((a, b) => a.salary - b.salary);

    return (
        <main>
            <h1>All Previous Offer Entries</h1>
            <table>
            <thead>
                <tr>
                <th>Company Name</th>
                <th>Yearly Salary</th>
                <th>Paycheck Takehome</th>
                <th>Stock Benefits</th>
                </tr>
            </thead>
            <tbody>
                {sortedEntries.length > 0 ? (
                sortedEntries.map((entry, index) => (
                    <tr key={index}>
                    <td>{entry.name}</td>
                    <td>{entry.yearly}</td>
                    <td>{entry.period}</td>
                    <td>{entry.stockPrice}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="4">No entries saved</td>
                </tr>
                )}
            </tbody>
            </table>
        </main>
      );
}