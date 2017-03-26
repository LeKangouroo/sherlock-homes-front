export default {

  patterns: {

    "common": [
      {
        match: "CACHE_BUST",
        replacement: Date.now()
      }
    ],
    "development": [
      {
        match: "ENV",
        replacement: "DEV"
      },
      {
        match: "HTTP_ROOT_DIR",
        replacement: ""
      },
      {
        match: "SHERLOCK_HOMES_API_BASE_URL",
        replacement: 'http://localhost:8080'
      }
    ],
    "pre-production": [
      {
        match: "ENV",
        replacement: "PRE-PRODUCTION"
      },
      {
        match: "HTTP_ROOT_DIR",
        replacement: ""
      }
    ],
    "production": [
      {
        match: "ENV",
        replacement: "PRODUCTION"
      },
      {
        match: "HTTP_ROOT_DIR",
        replacement: ""
      },
      {
        match: "SHERLOCK_HOMES_API_BASE_URL",
        replacement: 'http://sherlock-homes.io:8080'
      }
    ]
  }
};
