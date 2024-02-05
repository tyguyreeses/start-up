## Github Notes:
- Can clone from the command line using a url like this: "git clone https://github.com/YOUR_ACCOUNT_HERE/YOUR_PROJECT_HERE"

` Cool stuff `

## AWS Stuff
### Server
- Hosted through Amazon

### Domain
- Linked to existing server with IP address

I ran into a problem earlier when I linked my Domain to my server with its IP address, but I then assigned an elastic IP address to my server. That changed the overall IP address without me knowing. It was a simple fix once I realized that it was connected to the wrong address, but it was an annoying head scratcher.

### Deploying Files

You have to run the `deployFiles.sh` from the directory that contains the files you are deploying every time you want to update the code on the website itself that isn't part of the `live` option in VsCode.

### Responsive Design
- Aside
    `float: right;` - makes it stick to the right side and everything else wraps around it.

- Display
    `None` doesn't render, `block` takes up the entire width, `inline` only takes enough width to render, `flex` allows for different sized columns like a controls tab on the left, `grid` renders into multiple responsive areas.

- Fractional Unit (fr)
    Automatically splits it up into equal divisions

- Grid - `display: grid;`

    `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) - "fit as many onto the row as you can, minimum size of 300px"`

- Flex - `display: flex;`

    `flex-direction: column/row;` - defined in the parent object

    `flex: 0 80px;` - "don't resize me, always make it 80px"

    `flex: 1;` - resize it to a fractional unit
