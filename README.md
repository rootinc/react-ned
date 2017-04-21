# react-ned

## installation
`yarn add git+https://github.com/rootinc/react-ned.git`

## usage

### ned dictioanry
In a root/parent level component, call this in a constructor:
```
this.nedDictionary = new NedDictionary({
  urls:{
    en:"[link]",
    ..
  }
});
```
where urls is a hash of the languages, and [link] paths to the ned json file, either live or local.

Be sure to include the dictionary:
`import { NedDictionary } from 'react-ned';`

### ned

Once the dictionary is in place, wherever we need to utilize Ned, we can simply call ned id by:
```
<Ned textId="2" />
```

Ned can bring formatting down by doing:
```
<Ned textId="2" format />
```

Ned by default uses a `span`, but we can specify the tag by doing:
```
<Ned inputType="div" textId="2" />
```

Ned can pass any normal attributes down, like className, value, etc.  Simply do:
```
<Ned textId="2" className="rabbits" />
```

Be sure to include the dictionary:
`import { Ned } from 'react-ned';`

### other properties

By default, if no language is passed into the constructor, "en" will be the default.  At any time we can change the language, and all the ned components will update. To do this, simply call `setLanguage(lang)` on your dictionary object.  We can get the current language by calling `getLanguage` on the dictionary object.